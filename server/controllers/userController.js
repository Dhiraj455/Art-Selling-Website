const User = require("../models/user");
const fs = require("fs");

module.exports.update = async (req, res) => {
  try {
    const { name, description, email } = req.body;
    const user = await User.findOneAndUpdate(
      { email: email },
      {
        image: {
          data: fs.readFileSync("public/images/UserPic/" + req.file.filename),
          contentType: "image/png",
        },
        name,
        description,
      }
    );
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.log(err);
  }
};
