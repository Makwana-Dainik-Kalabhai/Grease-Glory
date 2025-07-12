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
    return res.status(500).json({ message: err.message });
  }
});

//! Search Food
router.route("/foods/search").get(async (req, res) => {
  try {
    const food = req.header("food");

    if (food) {
      const foodList = await FoodSchema.find({
        $or: [
          { category: { $regex: food, $options: "i" } },
          { name: { $regex: food, $options: "i" } },
        ],
      });

      if (foodList) return res.status(200).json(foodList);
      else return res.status(400).json({ message: "Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;