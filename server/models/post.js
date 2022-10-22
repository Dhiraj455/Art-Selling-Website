const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: [30, "Title Cannot Exceed 30 Characters"],
    minlength: [3, "Title Must Be Atleast 3 Characters"],
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 1,
  },
  isSold: {
    type: Boolean,
    required: true,
    default: false,
  },
  upVotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
    }
  ],
  boughtBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
