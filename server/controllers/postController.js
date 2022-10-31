const Post = require("../models/post");
const fs = require("fs");
const path = require("path");

module.exports.postArt = async (req, res) => {
  let response = {
    success: true,
    message: "",
    errMessage: "",
  };
  const { title, description, price, userId, count } = req.body;
  console.log(req.body);
  console.log(req.file);
  let post;
  if (req.file) {
    post = process.env.URL + "/images/Posts/" + req.file.filename;
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
        console.log(data);
        response.success = true;
        response.message = "Posted successfully";
        res.status(200).json(response);
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
    res.status(400).json(response);
  }
};

module.exports.getPosts = async (req, res) => {
  let response = {
    success: true,
    message: "",
    errMessage: "",
    result: "",
  };
  try {
    await Post.find({ isSold: false })
      .select("title description price post count")
      .populate({
        path: "createdBy",
        model: "User",
        select: "name image",
      })
      .then((data) => {
        response.success = true;
        response.result = data;
        console.log(data);
        res.status(200).json(response);
      });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
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
    await Post.find({ isSold: false })
      .select("title description price post count")
      .populate({
        path: "createdBy",
        model: "User",
        select: "name image",
      })
      .limit(20)
      .then((data) => {
        response.success = true;
        response.result = data;
        console.log(data);
        res.status(200).json(response);
      });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
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
      console.log(posts);
      imageName = posts.post.split("/");
      let imagepath =
        path.join(__dirname, "../public/images/Posts/") +
        imageName[imageName.length - 1];
      fs.unlinkSync(imagepath);
      response.success = true;
      response.message = "Post Deleted Successfully";
      res.status(200).json(response);
    } else {
      response.message = "No Post Found";
      res.status(400).json(response);
    }
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
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
    } else if (oldImage) {
      post = oldImage;
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

    res.json({ message: "Post updated successfully", post1 });
    // oldImage != "" &&
    if (post != oldPost) {
      let imageName = oldPost.split("/");
      console.log(imageName);
      console.log(imageName[imageName.length - 1]);
      let imagePath =
        path.join(__dirname, "../public/images/Posts/") +
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

module.exports.getAPost = async (req, res) => {
  let response = {
    success: true,
    message: "",
    errMessage: "",
    result: "",
  };
  try {
    const { id } = req.params;
    Post.findOne({ _id: id })
      .select("title description price post count")
      .populate({
        path: "createdBy",
        model: "User",
        select: "name image",
      })
      .then((data) => {
        response.success = true;
        response.result = data;
        console.log(data);
        res.status(200).json(response);
      });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};

module.exports.getMyPosts = async (req, res) => {
  const userId = req.userid;
  let response = {
    success: true,
    message: "",
    errMessage: "",
    result: "",
  };
  try {
    await Post.find({ createdBy: userId })
      .select("title description price post count")
      .populate({
        path: "createdBy",
        model: "User",
        select: "name image",
      })
      .then((data) => {
        response.success = true;
        response.result = data;
        console.log(data);
        res.status(200).json(response);
      });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};

module.exports.getBoughtItems = async (req, res) => {
  const userId = req.userid;
  let response = {
    success: true,
    message: "",
    errMessage: "",
    result: "",
  };
  try {
    await Post.find({ boughtBy: userId })
      .select("title description price post count")
      .populate({
        path: "createdBy",
        model: "User",
        select: "name image",
      })
      .then((data) => {
        response.success = true;
        response.result = data;
        console.log(data);
        res.status(200).json(response);
      });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};

module.exports.getUsersPosts = async (req, res) => {
  let response = {
    success: true,
    message: "",
    errMessage: "",
    result: "",
  };
  const id = req.params.id
  try{
    await Post.find({ createdBy: id })
    .select("title description price post count")
    .populate({
      path: "createdBy",
      model: "User",
      select: "name image",
    })
    .then((data) => {
      response.success = true;
      response.result = data;
      console.log(data);
      res.status(200).json(response);
    });
  }
  catch(err){
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
}
