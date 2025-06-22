const express = require("express");
const router = express.Router();
const FoodSchema = require("../models/foods");

router.route("/foods").get(async (req, res) => {
  try {
    const data = await FoodSchema.find();

    if (!!data) return res.status(200).json(data);
    else return res.status(400).json({ message: "Something went wrong" });
    //
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
