const express = require("express");
const router = express.Router();
const getUserData = require("../middleware/user-data");
const User = require("../models/user");

router.route("/user/user-data").get(getUserData, async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json(userData);
    //
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.route("/user/update").patch(async (req, res) => {
  try {
    const { _id } = req.body;
    const userData = req.body;

    const update = await User.updateOne({ _id }, userData);

    return (
      update.modifiedCount &&
      res.status(200).json({ message: "User updated successfully" })
    );
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
