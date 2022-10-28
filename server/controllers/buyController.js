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
      postBy: req.body.id,
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
    const { id, count } = req.body;
    await Cart.findOneAndUpdate(
      { _id: id },
      {
        $inc: {
          count : count
        },
      },
      { new: true }
    ).then((data) => {
      response.success = true;
      response.message = "Cart Updated Successful";
      res.status(200).json(response);
    });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};

module.exports.buyCart = async (req, res) => {
  console.log("Buying");
  const response = {
    success: true,
    message: "",
    errMessage: "",
  };
  const userId = req.body.userId;
  try {
    await Cart.find({ createdBy: userId }, (err, item) => {
      console.log(err);
      const len = item.length;
      console.log(item);
      console.log(len);
      for (var i = 0; i < len; i++) {
        Post.findOneAndUpdate(
          { _id: item[i].postBy },
          { $inc: { count: -item[i].count }, $push: { boughtBy: userId } }
        )
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
            response.message = "Error In Buying";
            return res.status(400).json(response);
          });
      }
      for (var i = 0; i < len; i++) {
        Cart.findOneAndDelete({ createdBy: item[i].createdBy })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
            response.message = "Error In Buying 2";
            return res.status(400).json(response);
          });
      }
      response.success = true;
      response.message = "Cart Bought Successfully";
      res.status(200).json(response);
    }).clone();
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};

module.exports.deleteItem = async (req, res) => {
  const response = {
    success: true,
    message: "",
    errMessage: "",
  };
  const { id, userId } = req.body;
  try {
    const item = await Cart.findOne({ _id: id });
    if (item) {
      await Cart.findOneAndDelete({ _id: id, createdBy: userId }).then(
        (data) => {
          console.log(data);
          response.success = true;
          response.message = "Cart Item Deleted Successfully";
          res.status(200).json(response);
        }
      );
    } else {
      response.message = "Item Not Found";
      res.status(200).json(response);
    }
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};
