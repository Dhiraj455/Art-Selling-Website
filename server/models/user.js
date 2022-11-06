const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const UserSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "https://jeffjbutler.com/wp-content/uploads/2018/01/default-user.png"
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  wallet: {
    type: Number,
    default: 0,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
  report: [
    {
      message : {
        type: String,
      },
      reportedBy : {
        type: mongoose.Schema.Types.ObjectId,
      }
    }
  ]
});

UserSchema.pre("save", async function (next) {
  var user = this;
  if (this.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
    user.cpassword = await bcrypt.hash(user.cpassword, 10);
  }
  next();
});

UserSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
