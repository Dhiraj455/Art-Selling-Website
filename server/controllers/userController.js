const User = require("../models/user");
const fs = require("fs");
const path = require("path");

module.exports.update = async (req, res) => {
  // console.log("Updating");
  let response = {
    success: false,
    message: "",
    errMessage: "",
  };
  try {
    const { name, description, email, oldImage } = req.body;
    console.log(req.body);
    let image;
    if (req.file) {
      temp = req.file.filename.split(".");
      fileType = temp[temp.length - 1];
      image = process.env.URL + "/images/UserPic/" + req.file.filename;
    } else if (oldImage) {
      image = oldImage;
    }

    const user = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          // image: {
          //   data: fs.readFileSync("public/images/UserPic/" + req.file.filename),
          //   contentType: "image/png",
          // },
          image,
          name,
          description,
        },
      },
      { new: true }
    );
    res.json({ message: "User updated successfully", user });
    // oldImage != "" &&
    if (image != oldImage) {
      let imageName = oldImage.split("/");
      console.log(imageName);
      console.log(imageName[imageName.length - 1]);
      let imagePath =
        path.join(__dirname, "../public/images/UserPic/") +
        imageName[imageName.length - 1];
      console.log(imagePath);
      fs.unlink(imagePath, (err) => {
        if (err) {
          response.errMessage = err.message;
          response.message = "Failed to update event , please try again";
          return res.status(400).json(response);
        }
      });
    }
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};

module.exports.getProfile = async (req, res) => {
  // console.log("Profile");
  console.log(req.user)
  let response = {
    success: true,
    message: "",
    errMessage: "",
    result: "",
  };
  let { id } = req.params;
  try {
    await User.findOne({ _id: id })
      // .populate([{ select: "name description image" }])
      .then((result) => {
        // console.log(result);
        // let imageName = result.image.split("/");
        // console.log(imageName);
        // console.log(imageName[imageName.length - 1]);
        // let imagePath =
        //   path.join(__dirname, "../public/images/UserPic/") +
        //   imageName[imageName.length - 1];
        // console.log(imagePath);
        // result.image = imagePath;
        response.result = result;
        response.success = true;
        res.status(200).json(response);
      });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};
