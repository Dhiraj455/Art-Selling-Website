const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  createAccessToken,
  createRefreshToken,
} = require("../middleware/jwtToken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

module.exports.register = async (req, res) => {
  const response = {
    success: true,
    message: "",
    errMessage: "",
  };
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(422).send({ message: "Please fill all the fields" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.send({ message: "User already exists" }).status(200);
    }
    const newUser = new User({
      name,
      email,
      password,
      cpassword,
    });
    await newUser.save();
    response.success = true;
    response.message = "User created successfully";
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  let token = "";
  if (!email || !password) {
    return res.status(400).send({ message: "Please fill all the fields" });
  }
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
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
        return res.status(400).send({ message: "Invalid Credentials" });
      } else {
        return res.send({ message: "Login Successful" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.google = async (req, res) => {
  const { token } = req.body;
  let tokens = "";
  let response = {
    success: false,
    message: "",
    result: "",
  };
  let audience;

  try {
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
      return res.status(200).send(response);
    } else {
      response.message = "Please register to sign in";
      return res.status(400).send(response);
    }
  } catch (err) {
    console.log(err);
    response.errorMessage = err.message;
    response.message = "Failed to sign in , please try again";
    return res.status(400).send(response);
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
    response.errMessage = err.message;
    return res.send(response);
  }
};
