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
    return res.status(500).json({ message: err.message });
  }
});

router.route("/user/update").patch(async (req, res) => {
  try {
    const { _id } = req.body;
    const userData = req.body;

    const update = await User.updateOne({ _id }, userData);

    if (update.modifiedCount)
      return res.status(200).json({ message: "User updated successfully" });
    else return res.status(400).json({ message: "Data is already updated" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
