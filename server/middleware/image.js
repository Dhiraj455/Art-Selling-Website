const multer = require("multer");
const path = require("path");
const fs = require("fs");

const setDestination = (destination) => {
  return (req, res, next) => {
    req.destination = destination;
    next();
  };
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = req.destination;
    const exist = fs.existsSync(dir);
    if (!exist) {
      return fs.mkdir(dir, (error) => cb(error, dir));
    }
    return cb(null, dir);
  },
  filename: (req, file, cb) => {
    return cb(
      null,
      `${new Date().getTime()}${file.originalname.split(" ").join("-")}`
    );
  },
});

const upload = multer({
  storage: storage,
});

exports.upload = upload;
exports.setDestination = setDestination;
