const express = require("express");
const router = express.Router();
const FoodSchema = require("../models/foods");
const protectAdminRoute = require("../middleware/protect-admin");
const cloudinary = require("../utils/cloudinary");

//! Admin-Panel Routes
//* Foods
router.route("/foods").get(async (req, res) => {
  try {
    const data = await FoodSchema.find();

    if (!!data) return res.status(201).json(data);
    else return res.status(400).json({ message: "Something went wrong" });
    //
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//* Update Food
router
  .route("/admin/food/update")
  .patch(protectAdminRoute, async (req, res) => {
    try {
      const { _id } = req.body;
      const { img } = req.body;
      const food = req.body;

      if (img) {
        const upload = await cloudinary.uploader.upload(img);
        req.body.img = upload.secure_url;
      }

      const updateFood = await FoodSchema.updateOne({ _id }, food).select({
        _id,
      });

      if (updateFood && updateFood.modifiedCount)
        return res
          .status(200)
          .json({ message: "Food details updated succesfully" });
      else return res.status(400).json({ message: "Something went wrong" });
      //
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

//
//* Delete Food
router
  .route("/admin/food/delete")
  .delete(protectAdminRoute, async (req, res) => {
    try {
      const _id = req.header("_id");

      const deleteFood = await FoodSchema.deleteOne({ _id });

      if (deleteFood.deletedCount)
        return res.status(200).json({ message: "Food deleted successfully" });
      else return res.status(401).json({ message: "Something went wrong" });
      //
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

//
//
//
//
//
//! User-Panel Routes
//
//* Search Food
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
