const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
  totals: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  postsDetails: [
    {
      postId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      boughtFrom: {
        type: mongoose.Schema.Types.ObjectId,
      },
      count: {
        type: Number,
      },
      price: {
        type: Number,
      },
      isDelivered: {
        type: Boolean,
        default: false,
      },
    },
  ],
  isAccepted: {
    type: Boolean,
    default: false,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
});

const Track = mongoose.model("Track", TrackSchema);
module.exports = Track;
