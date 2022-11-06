const User = require("../models/user");
const Post = require("../models/post");
const fs = require("fs");
const path = require("path");

module.exports.update = async (req, res) => {
  let response = {
    success: false,
    message: "",
    errMessage: "",
  };
  try {
    const { name, description, email, oldImage } = req.body;
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
          image,
          name,
          description,
        },
      },
      { new: true }
    );
    res.json({ message: "User updated successfully", user });
    if (oldImage != "" && image != oldImage) {
      let imageName = oldImage.split("/");
      let imagePath =
        path.join(__dirname, "../public/images/UserPic/") +
        imageName[imageName.length - 1];
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
  let response = {
    success: true,
    message: "",
    errMessage: "",
    result: "",
  };
  let { id } = req.params;
  try {
    await User.findOne({ _id: id }).then((result) => {
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

module.exports.getMyPost = async (req, res) => {
  let response = {
    success: true,
    message: "",
    errMessage: "",
    result: "",
  };
  let { id } = req.params;
  try {
    Post.find({ createdBy: id })
      .sort({ createdAt: -1 })
      .then((result) => {
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

module.exports.addWallet = async (req, res) => {
  let response = {
    success: false,
    message: "",
    errMessage: "",
  };
  const { id, wallet } = req.body;
  try {
    await User.findOneAndUpdate(
      { _id: id },
      {
        $inc: { wallet: wallet },
      },
      { new: true }
    );
    response.success = true;
    response.message = "Wallet added successfully";
    res.status(200).json(response);
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};
