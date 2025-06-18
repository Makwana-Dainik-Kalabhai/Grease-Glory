const express = require("express");
const router = express.Router();
const getUserData = require("../middleware/user-data");

router.route("/user/user-data").get(getUserData, async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ message: userData });
    //
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
