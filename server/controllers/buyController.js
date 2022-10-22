const Cart = require("../models/cart");
const Post = require("../models/post");

module.exports.addToCart = async (req, res) => {
  const response = {
    success: true,
    message: "",
    errMessage: "",
  };
  try {
    const { userId, count, price, postImage, title } = req.body;
    console.log(req.body);
    let cart = new Cart({
      createdBy: userId,
      count,
      price,
      postImage,
      // postBy: req.body.id,
      title,
    });
    await cart.save().then((data) => {
      console.log(data);
      response.success = true;
      response.message = "Added To Cart";
      res.status(200).json(response);
    });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};

module.exports.getMyCart = async (req, res) => {
  const { id } = req.params;
  console.log(id, req.params);
  let response = {
    success: false,
    result: "",
    message: "",
    errMessage: "",
    total: "",
  };
  try {
    let total = 0;
    Cart.find({ createdBy: id })
      .select("count price postImage title")
      .then((result) => {
        if (result) {
          for (let i = 0; i < result.length; i++) {
            total += result[i].count * result[i].price;
          }
          console.log(result);
          response.success = true;
          response.message = "My Cart";
          response.result = result;
          response.total = total;
          console.log(response);
          res.status(200).json(response);
        } else {
          response.message = "No Item In Cart";
          res.status(400).json(response);
        }
      });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};

module.exports.updateCart = async (req, res) => {
  const response = {
    success: true,
    message: "",
    errMessage: "",
  };
  try {
    const { postId, count } = req.body;
    await Post.findOneAndUpdate(
      { _id: postId },
      {
        $set: {
          count,
        },
      },
      { new: true }
    ).then((data)=>{
      response.success = true;
      response.message = "Cart Updated Successful"
      res.status(200).json(response);
    })
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};
