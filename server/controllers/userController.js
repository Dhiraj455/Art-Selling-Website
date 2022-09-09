const User = require("../models/user");

module.exports.update = async (req, res) => {
  try {
    const { name, description, email } = req.body;
    const user = await User.findOneAndUpdate(
      { email: email },
      { name, description }
    );
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.log(err);
  }
};
