const express = require("express");
const router = express.Router();
const getUserData = require("../middleware/user-data");

router.route("/user").get(getUserData, async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json(userData);
    //
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
