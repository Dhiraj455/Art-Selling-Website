const Cart = require("../models/cart");
const Post = require("../models/post");
const Track = require("../models/track");
const User = require("../models/user");

module.exports.addToCart = async (req, res) => {
  const response = {
    success: true,
    message: "",
    errMessage: "",
  };
  try {
    const { userId, count, price, postImage, title } = req.body;
    console.log(req.body.id);
    console.log(req.body);
    const carts = await Cart.findOne({
      postBy: req.body.id,
      createdBy: userId,
    });
    console.log(carts);
    if (carts) {
      const post = await Post.findOne({ _id: req.body.id });
      if (post.count < carts.count + count) {
        response.success = true;
        response.message = "Count Is Out Of Stock";
        return res.status(400).json(response);
      } else {
        await Post.findOneAndUpdate(
          { _id: req.body.id },
          { $inc: { count: -count } },
          { new: true }
        );
      }
      await Cart.findOneAndUpdate(
        { postBy: req.body.id, createdBy: userId },
        { $inc: { count: count } },
        { new: true }
      )
        .then((data) => {
          console.log("Updated cart", data);
          response.success = true;
          response.message = "Added To Cart";
          return res.status(200).json(response);
        })
        .catch((err) => {
          console.error("Error 5", err);
        });
    } else {
      await Post.findOneAndUpdate(
        { _id: req.body.id },
        { $inc: { count: -count } },
        { new: true }
      );
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
    }
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
      .sort({ createdAt: -1 })
      .select("count price postImage title postBy createdBy")
      .populate({
        path: "postBy",
        model: "Post",
        select: "count createdBy",
      })
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
  const { id, count } = req.body;
  console.log(req.body);
  try {
    await Cart.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          count: count,
        },
      },
      { new: true }
    ).then((data) => {
      console.log("Updated");
    });
    response.success = true;
    response.message = "Cart Updated Successful";
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};

module.exports.buyCart = async (req, res) => {
  console.log("Buying");
  console.log(req.body);
  const response = {
    success: true,
    message: "",
    errMessage: "",
  };
  const { totals, userId } = req.body;
  let postDetail = [];
  for (let i = 0; i < req.body.postsDetails.length; i++) {
    postDetail.push({
      postId: req.body.postsDetails[i]._id,
      boughtFrom: req.body.postsDetails[i].createdBy,
      count: req.body.count[i],
      price: req.body.price[i],
    });
  }
  console.log(postDetail);
  try {
    const user = await User.findOne({ _id: userId });
    if (user.wallet < totals) {
      response.message = "Less Balance In Wallet";
      console.log(response);
      return res.status(200).json(response);
    } else if (!req.body.postsDetails) {
      response.message = "No Products";
      console.log(response);
      return res.status(200).json(response);
    } else {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          $inc: {
            wallet: -totals,
          },
        },
        { new: true }
      );
      await Cart.find({ createdBy: userId }, (err, item) => {
        console.log("Items", item);
        const len = item.length;
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
          Post.findOneAndUpdate(
            { _id: item[i].postBy },
            {
              $inc: { count: -item[i].count },
            },
            { new: true }
          )
            .then(async (data) => {
              console.log("Data By Me", data._id);
              if (
                data.count <= 0 ||
                (data.count == 0 && data.isSold == false)
              ) {
                await Post.findOneAndUpdate(
                  { _id: data._id },
                  { $set: { isSold: true } },
                  { new: true }
                );
              } else {
                console.log("Else mai hai tu");
              }
            })
            .catch((err) => {
              console.log(err);
              response.message = "Error In Buying";
              res.status(400).json(response);
            });
        }
        response.success = true;
        response.message = "Bought Successfully";
        console.log(response);
        res.status(200).json(response);
      }).clone();
      const track = new Track({
        totals,
        createdBy: userId,
        postsDetails: postDetail,
      });
      await track.save();
    }
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
        async (data) => {
          console.log(data);
          await Post.findOneAndUpdate(
            { _id: data.postBy._id },
            { $inc: { count: data.count } },
            { new: true }
          );
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

module.exports.getTrack = async (req, res) => {
  const userId = req.userid;
  let response = {
    success: false,
    result: "",
    message: "",
    errMessage: "",
  };
  try {
    await Track.find({ createdBy: userId, isAccepted: false })
      .sort({ createdAt: -1 })
      .select("totals isAccepted isDelivered createdBy")
      .populate({
        path: "postsDetails",
        select: "boughtFrom isDelivered count",
        populate: {
          path: "postId",
          model: "Post",
          select: "price post title",
        },
      })
      .then((data) => {
        console.log(data);
        response.success = true;
        response.result = data;
        res.status(200).json(response);
      });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};

module.exports.getDeliveredTrack = async (req, res) => {
  const userId = req.userid;
  console.log(userId);
  let response = {
    success: false,
    result: "",
    message: "",
    errMessage: "",
  };
  try {
    await Track.find({
      postsDetails: { $elemMatch: { boughtFrom: userId, isDelivered: false } },
      isDelivered: false,
    })
      .sort({ createdAt: -1 })
      .select("totals isAccepted isDelivered createdBy")
      .populate({
        path: "postsDetails",
        select: "boughtFrom isDelivered count",
        populate: {
          path: "postId",
          model: "Post",
          select: "price post title",
        },
      })
      .then((data) => {
        console.log(data);
        response.success = true;
        response.result = data;
        res.status(200).json(response);
      });
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};

module.exports.isDelivered = async (req, res) => {
  const response = {
    success: true,
    message: "",
    errMessage: "",
  };
  let count = 0;
  const userId = req.userid;
  const { id, postId } = req.body;
  try {
    const track = await Track.findOne({
      _id: id,
      postsDetails: { $elemMatch: { boughtFrom: userId } },
    });
    await Track.updateOne(
      {
        _id: id,
        postsDetails: { $elemMatch: { boughtFrom: userId } },
        "postsDetails._id": postId,
      },
      { $set: { "postsDetails.$.isDelivered": true } },
      { new: true }
    );
    await Track.findOne({
      _id: id,
      postsDetails: { $elemMatch: { boughtFrom: userId } },
    }).then((data) => {
      console.log(data);
      for (let i = 0; i < data.postsDetails.length; i++) {
        if (data.postsDetails[i].isDelivered == true) {
          count += 1;
        } else {
          count = count;
        }
      }
    });
    console.log(count);
    if (count === track.postsDetails.length) {
      await Track.findOneAndUpdate(
        {
          _id: id,
          postsDetails: { $elemMatch: { boughtFrom: userId } },
        },
        { $set: { isDelivered: true } }
      );
      response.success = true;
      response.message = "All Delivered";
      res.status(200).json(response);
    } else {
      response.success = true;
      response.message = "Delivered";
      res.status(200).json(response);
    }
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};

module.exports.isAccepted = async (req, res) => {
  console.log(req.userid);
  const response = {
    success: true,
    message: "",
    errMessage: "",
  };
  const { id } = req.body;
  const userId = req.userid;
  try {
    const track = await Track.findOneAndUpdate(
      { _id: id, createdBy: userId },
      { $set: { isAccepted: true } },
      { new: true }
    );
    const len = track.postsDetails.length;
    console.log(track, len);
    for (var i = 0; i < len; i++) {
      User.findOneAndUpdate(
        { _id: track.postsDetails[i].boughtFrom },
        {
          $inc: { wallet: track.postsDetails[i].price },
        },
        { new: true }
      ).then((data) => {
        console.log(data);
      });
      Post.findOneAndUpdate(
        { _id: track.postsDetails[i].postId },
        {
          // $inc: { count: -track.postsDetails[i].count },
          $push: { boughtBy: userId },
        },
        { new: true }
      )
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          response.message = "Error In Buying";
          res.status(400).json(response);
        });
    }
    response.success = true;
    response.message = "Accepted";
    res.status(200).json(response);
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};

module.exports.isNotDelivered = async (req, res) => {
  const response = {
    success: true,
    message: "",
    errMessage: "",
  };
  let count = 0;
  const userId = req.userid;
  const { id, postId } = req.body;
  try {
    const track = await Track.findOne({
      _id: id,
      // postsDetails: { $elemMatch: { boughtFrom: userId } },
      createdBy: userId,
    });
    await Track.updateOne(
      {
        _id: id,
        // postsDetails: { $elemMatch: { boughtFrom: userId } },
        createdBy: userId,
        "postsDetails._id": postId,
      },
      { $set: { "postsDetails.$.isDelivered": false } },
      { new: true }
    );
    await Track.findOne({
      _id: id,
      // postsDetails: { $elemMatch: { boughtFrom: userId } },
      createdBy: userId,
    }).then((data) => {
      console.log(data);
      for (let i = 0; i < data.postsDetails.length; i++) {
        if (data.postsDetails[i].isDelivered == true) {
          count += 1;
        } else {
          count = count;
        }
      }
    });
    console.log(count);
    if (count === track.postsDetails.length) {
      await Track.findOneAndUpdate(
        {
          _id: id,
          // postsDetails: { $elemMatch: { boughtFrom: userId } },
          createdBy: userId,
        },
        { $set: { isDelivered: true } }
      );
      response.success = true;
      response.message = "Successfully Declined 2";
      res.status(200).json(response);
    } else {
      await Track.findOneAndUpdate(
        {
          _id: id,
          // postsDetails: { $elemMatch: { boughtFrom: userId } },
          createdBy: userId,
        },
        { $set: { isDelivered: false } }
      );
      response.success = true;
      response.message = "Successfully Declined";
      res.status(200).json(response);
    }
  } catch (err) {
    console.log("Error", err);
    response.message = "Something went wrong!";
    response.errMessage = err.message;
    res.status(400).json(response);
  }
};
