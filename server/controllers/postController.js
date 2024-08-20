const Post = require("../models/post");
const fs = require("fs");
const path = require("path");
const Track = require("../models/track");
const Cart = require("../models/cart");

module.exports.postArt = async (req, res) => {
  let response = {
    success: true,
    message: "",
    errMessage: "",
  };
  const { title, description, price, userId, count } = req.body;
  let post;
  if (req.file) {
    post = process.env.URL + "/images/Posts/" + req.file.filename;
  } else {
    response.message = "Set Post Image";
    return res.status(200).send(response);
  }
  try {
    const postArt = new Post({
      title,
      description,
      price,
      createdBy: userId,
      post,
      count,
    });
    await postArt
      .save()
      .then((data) => {
        response.success = true;
        response.message = "Posted successfully";
        res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        fs.unlinkSync(req.file.path);
      });
  } catch (err) {
    fs.unlinkSync(req.file.path);
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    return res.status(400).send(response);
  }
};

module.exports.getPosts = async (req, res) => {
  let response = {
    success: true,
    message: "",
    errMessage: "",
    result: "",
    totalPage: 0,
  };
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const startIndex = (page - 1) * limit;
  try {
    await Post.find({ userSuspended: false })
      .sort({ createdAt: -1 })
      .select("title description price post count")
      .populate({
        path: "createdBy",
        model: "User",
        select: "name image",
      })
      .then((result) => {
        if (result.length > 0) {
          totalPage = Math.ceil(result.length / limit);
          result = result.slice(startIndex, page * limit);
          response.success = true;
          response.errMessage = undefined;
          response.message = undefined;
          response.result = result;
          response.totalPage = totalPage;
        } else {
          response.errMessage = undefined;
          response.totalPage = 1;
          response.message = "No results found";
        }
        return res.status(200).send(response);
      });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    return res.status(400).send(response);
  }
};

module.exports.getSomePosts = async (req, res) => {
  let response = {
    success: true,
    message: "",
    errMessage: "",
    result: "",
  };
  try {
    await Post.find({ isSold: false, userSuspended: false })
      .sort({ createdAt: -1 })
      .select("title description price post count")
      .populate({
        path: "createdBy",
        model: "User",
        select: "name image",
      })
      .limit(8)
      .then((data) => {
        response.success = true;
        response.result = data;
        return res.status(200).send(response);
      });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    return res.status(400).send(response);
  }
};

module.exports.deletePost = async (req, res) => {
  const { id, userId } = req.body;
  let response = {
    success: false,
    message: "",
    errMessage: "",
  };
  try {
    const posts = await Post.findOneAndDelete({ _id: id, createdBy: userId });
    if (posts) {
      imageName = posts.post.split("/");
      let imagepath =
        path.join(__dirname, "../public/images/Posts/") +
        imageName[imageName.length - 1];
      fs.unlinkSync(imagepath);
      Cart.deleteMany({ postBy: id });

      await Track.find({
        postsDetails: { $elemMatch: { postId: id } },
      })
        .then(async (data) => {
          await Track.updateMany(
            {
              postsDetails: { $elemMatch: { postId: id } },
            },
            { $pull: { postsDetails: { postId: id } } },
            { new: true }
          )
            .then(async () => {
              for (let i = 0; i < data.length; i++) {
                await Track.findOne({ _id: data[i]._id }).then(async (data) => {
                  if (
                    data.postsDetails.length <= 0 ||
                    data.postsDetails == []
                  ) {
                    await Track.findOneAndDelete({
                      _id: data._id,
                    })
                      .then((data) => {})
                      .catch((err) => {
                        console.log("Track", err);
                      });
                  } else {
                    console.log("Track not found");
                  }
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          console.log("Error trac Deleting");
        });
      response.success = true;
      response.message = "Post Deleted Successfully";
      return res.status(200).send(response);
    } else {
      response.message = "No Post Found";
      return res.status(200).send(response);
    }
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    return res.status(400).send(response);
  }
};

module.exports.updatePost = async (req, res) => {
  let response = {
    success: false,
    message: "",
    errMessage: "",
  };
  try {
    const { id, title, description, price, userId, oldPost, count } = req.body;
    let post;
    if (req.file) {
      temp = req.file.filename.split(".");
      fileType = temp[temp.length - 1];
      post = process.env.URL + "/images/Posts/" + req.file.filename;
    } else if (oldPost) {
      post = oldPost;
    }
    let post1;
    if (count > 0) {
      post1 = await Post.findOneAndUpdate(
        { _id: id, createdBy: userId },
        {
          $set: {
            post,
            title,
            description,
            price,
            count,
            isSold: false,
          },
        },
        { new: true }
      );
    } else {
      post1 = await Post.findOneAndUpdate(
        { _id: id, createdBy: userId },
        {
          $set: {
            post,
            title,
            description,
            price,
            count,
          },
        },
        { new: true }
      );
    }

    res.send({ message: "Post updated successfully", post1 });
    // oldImage != "" &&
    if (post != oldPost) {
      let imageName = oldPost.split("/");
      let imagePath =
        path.join(__dirname, "../public/images/Posts/") +
        imageName[imageName.length - 1];
      fs.unlink(imagePath, (err) => {
        if (err) {
          response.errMessage = err.message;
          response.message = "Failed to update event , please try again";
          return res.status(400).send(response);
        }
      });
    }
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    return res.status(400).send(response);
  }
};

module.exports.getAPost = async (req, res) => {
  let response = {
    success: true,
    message: "",
    errMessage: "",
    result: "",
  };
  try {
    const { id } = req.params;
    Post.findOne({ _id: id, userSuspended: false })
      .select("title description price post count")
      .populate({
        path: "createdBy",
        model: "User",
        select: "name image",
      })
      .then((data) => {
        response.success = true;
        response.result = data;
        return res.status(200).send(response);
      });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    return res.status(400).send(response);
  }
};

module.exports.getMyPosts = async (req, res) => {
  const userId = req.userid;
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
    await Post.find({ createdBy: userId, userSuspended: false })
      .sort({ createdAt: -1 })
      .select("title description price post count")
      .populate({
        path: "createdBy",
        model: "User",
        select: "name image",
      })
      .then((result) => {
        if (result.length > 0) {
          totalPage = Math.ceil(result.length / limit);
          result = result.slice(startIndex, page * limit);
          response.success = true;
          response.errMessage = undefined;
          response.message = undefined;
          response.result = result;
          response.totalPage = totalPage;
        } else {
          response.errMessage = undefined;
          response.totalPage = 1;
          response.message = "No results found";
        }
        return res.status(200).send(response);
      });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    return res.status(400).send(response);
  }
};

module.exports.getBoughtItems = async (req, res) => {
  const userId = req.userid;
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
    await Post.find({ boughtBy: userId, userSuspended: false })
      .sort({ createdAt: -1 })
      .select("title description price post count")
      .populate({
        path: "createdBy",
        model: "User",
        select: "name image",
      })
      .then((result) => {
        if (result.length > 0) {
          totalPage = Math.ceil(result.length / limit);
          result = result.slice(startIndex, page * limit);
          response.success = true;
          response.errMessage = undefined;
          response.message = undefined;
          response.result = result;
          response.totalPage = totalPage;
        } else {
          response.errMessage = undefined;
          response.totalPage = 1;
          response.message = "No results found";
        }
        return res.status(200).send(response);
      });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    return res.status(400).send(response);
  }
};

module.exports.getUsersPosts = async (req, res) => {
  let response = {
    success: true,
    message: "",
    errMessage: "",
    result: "",
    totalPage: "",
  };
  const id = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const startIndex = (page - 1) * limit;
  try {
    await Post.find({ createdBy: id, userSuspended: false })
      .sort({ createdAt: -1 })
      .select("title description price post count")
      .populate({
        path: "createdBy",
        model: "User",
        select: "name image",
      })
      .then((result) => {
        if (result.length > 0) {
          totalPage = Math.ceil(result.length / limit);
          result = result.slice(startIndex, page * limit);
          response.success = true;
          response.errMessage = undefined;
          response.message = undefined;
          response.result = result;
          response.totalPage = totalPage;
        } else {
          response.errMessage = undefined;
          response.totalPage = 1;
          response.message = "No results found";
        }
        return res.status(200).send(response);
      });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    return res.status(400).send(response);
  }
};
