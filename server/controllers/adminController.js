const Post = require("../models/post");
const Track = require("../models/track");
const Cart = require("../models/cart");
const User = require("../models/user");

module.exports.getAllUsers = async (req, res) => {
  let response = {
    success: true,
    message: "",
    errMessage: "",
    result: "",
    totalPage: "",
  };
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const startIndex = (page - 1) * limit;
  try {
    const result = await User.find({}).sort({ "report.length": -1 });
    if (result.length > 0) {
      totalPage = Math.ceil(result.length / limit);
      let results = result.slice(startIndex, page * limit);
      response.success = true;
      response.errMessage = undefined;
      response.message = undefined;
      response.result = results;
      response.totalPage = totalPage;
    } else {
      response.errMessage = undefined;
      response.totalPage = 1;
      response.message = "No results found";
    }
    return res.status(200).json(response);
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};

module.exports.getSomeUsers = async (req, res) => {
  let response = {
    success: true,
    message: "",
    errMessage: "",
    result: "",
  };
  try {
    const user = await User.find({}).limit(8);
    response.success = true;
    response.result = user;
    res.status(200).json(response);
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};

module.exports.suspend = async (req, res) => {
  let response = {
    success: true,
    message: "",
    errMessage: "",
    result: "",
  };
  const { id } = req.body;
  try {
    await User.findOneAndUpdate(
      { _id: id },
      { $set: { isSuspended: true } },
      { new: true }
    );
    await Post.find({ createdBy: id }).then(async (data) => {
      for (var i = 0; i < data.length; i++) {
        await Post.updateMany(
          { createdBy: id },
          { $set: { userSuspended: true } },
          { new: true }
        );
        await Track.updateMany(
          { postsDetails: { $elemMatch: { postId: data[i]._id } } },
          { $pull: { postsDetails: { postId: data[i]._id } } },
          { new: true }
        );
        await Cart.find({ postBy: data[i]._id }).then((result) => {
          for (var i = 0; i < result.length; i++) {
            Post.findOneAndUpdate(
              { _id: result[i].postBy },
              { $inc: { count: result[i].count } },
              { new: true }
            );
          }
        });
      }
    });
    await Track.deleteMany({ createdBy: id });
    await Cart.deleteMany({ createdBy: id });
    response.success = true;
    response.message = "User Suspended";
    res.status(200).json(response);
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};
