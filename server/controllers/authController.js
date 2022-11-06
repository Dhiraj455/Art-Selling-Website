const bcrypt = require("bcryptjs");
const User = require("../models/user");
const fs = require("fs");
const {
  createAccessToken,
  createRefreshToken,
} = require("../middleware/jwtToken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

module.exports.register = async (req, res) => {
  // console.log(req.file.filename);
  const response = {
    success: true,
    message: "",
    errMessage: "",
  };
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ message: "Please fill all the fields" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.json({ message: "User already exists" }).status(200);
    }
    const newUser = new User({
      // image: {
      //   data: fs.readFileSync("public/images/UserPic/" + req.file.filename),
      //   contentType: "image/png",
      // },
      name,
      email,
      password,
      cpassword,
    });
    await newUser.save();
    response.success = true;
    response.message = "User created successfully";
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  let token = "";
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      token = await user.generateAuthToken();
      const maxAge = 1000 * 60;
      res.cookie("jwttoken", token, {
        httpOnly: true,
        secure: true,
        expires: maxAge,
        maxAge: maxAge * 1000,
      });

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      } else {
        res.json({ message: "Login Successful" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.google = async (req, res) => {
  console.log("hello Login");
  const { token } = req.body;
  let tokens = "";
  let response = {
    success: false,
    message: "",
    result: "",
  };
  let audience;

  try {
    // if (process.env.NODE_ENV === "dev") audience = process.env.OAUTH_DEV_ID;
    // else if (process.env.NODE_ENV === "prod") audience = process.env.OAUTH_ID;
    // else if (process.env.NODE_ENV === "test")
    audience = process.env.OAUTH_ID;
    const ticket = await client.verifyIdToken({
      idToken: token,
      // audience: [audience, process.env.OAUTH_APP_ID],
    });

    const { email } = ticket.getPayload();
    let user = await User.findOne({ email: email });

    tokens = await user.generateAuthToken();
    if (user) {
      response.success = true;
      response.result = user;
      response.accessToken = createAccessToken(user);
      response.refreshToken = createRefreshToken(user);
      res.cookie("jwttoken", tokens, response.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        signed: true,
        secure: true,
        path: "/refreshToken",
      });
      console.log(response.accessToken);
      return res.status(200).json(response);
    } else {
      response.message = "Please register to sign in";
      return res.status(400).json(response);
    }
  } catch (err) {
    console.log(err);
    response.errorMessage = err.message;
    // console.log(err, "error");
    response.message = "Failed to sign in , please try again";
    return res.status(400).json(response);
  }
};

module.exports.refreshToken = async (req, res) => {
  let token;
  const authorization = req.header("Authorization");
  const { jwt } = req.signedCookies;
  let response = { success: false, accessToken: "" };
  if (jwt) token = jwt;
  else if (authorization) {
    const appJwt = authorization.split(" ")[1];
    token = appJwt;
  } else {
    res.message = "unauthorized token not received";
    return res.status(401).send(response);
  }

  try {
    const payload = verify(token, process.env.REFRESH_TOKEN);
    const user = await User.findOne({ _id: payload.userId })
      .select("name profile email roleModel role isEventHead")
      .populate({ path: "role", model: payload.roleModel, select: "slug" });
    if (!user) {
      response.message = "user not found";
      return res.send(response);
    }
    response.data = user;
    response.refreshToken = createRefreshToken(user);
    res.cookie("jwttoken", response.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      signed: true,
      secure: true,
      path: "/refreshToen",
    });
    response.success = true;
    response.accessToken = createAccessToken(user);
    // console.log(response.accessToken)
    return res.status(200).send(response);
  } catch (err) {
    // console.log(err);
    response.errMessage = err.message;
    return res.send(response);
  }
};
