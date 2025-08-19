const express = require("express");
const router = express.Router();
const protectAdminRoute = require("../middleware/protect-admin");
const getUserData = require("../middleware/user-data");
const User = require("../models/user");

//! Admin-Panel Routes
//* Total & All Users
router.route("/admin/users").get(protectAdminRoute, async (req, res) => {
  try {
    const _id = req.header("_id");
    const users = await User.find({ _id: { $ne: _id } }).select({
      password: 0,
      __v: 0,
    });

    if (users) return res.status(200).json(users);

    //
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//* Delete particular User
router.route("/admin/delete").delete(protectAdminRoute, async (req, res) => {
  try {
    const _id = req.header("userId");

    const deleteUser = await User.deleteOne({ _id });

    if (deleteUser.deletedCount)
      return res.status(200).json({ message: "User deleted successfully" });
    else return res.status(400).json({ message: "Something went wrong" });
    //
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//
//
//
//
//! User-Panel Routes
//* Get user data for particular user
router.route("/user/user-data").get(getUserData, async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json(userData);
    //
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//
//
//* Update User
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
