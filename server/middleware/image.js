const multer = require("multer");
const path = require("path");
const fs = require("fs");

let destination;
const setDestination = (dest) => {
  return (req, res, next) => {
    destination = dest;
    next();
  };
};
console.log("setDestination", destination);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage : storage, fileFilter });

// const upload = multer({ storage: storage });

exports.upload = upload;
exports.setDestination = setDestination;
