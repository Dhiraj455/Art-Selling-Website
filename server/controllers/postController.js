const Post = require("../models/post");
const fs = require("fs");

module.exports.postArt = async (req, res) => {
  let response = {
    success: true,
    message: "",
    errMessage: "",
  };
  const { title, description, price } = req.body;
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
        post
    });
    await postArt.save().then((data) => {
        console.log(data);
        response.success = true;
        response.message = "Posted successfully"
        res.status(200).json(response);
    }).catch((err) => {
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

module.exports.getPosts = async (req,res) => {

}

module.exports.deletePost = async (req, res) => {
    
}