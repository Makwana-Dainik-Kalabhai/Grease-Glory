const express = require("express");
const router = express.Router();
const FoodSchema = require("../models/foods");
const CartSchema = require("../models/cart");
const getUserData = require("../middleware/user-data");

//! Add Food to Cart
router.route("/add-cart").post(getUserData, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const item = { productId, email: req.user.email, quantity };

    const addCart = await CartSchema.create(item);

    if (addCart)
      res.status(201).json({ message: "Product successfully added into cart" });
    else res.status(400).json({ message: "Something went wrong" });
    //
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//! Get Cart Items
router.route("/cart").get(getUserData, async (req, res) => {
  try {
    const { email } = req.user;

    const cartItems = await CartSchema.find({ email })
      .populate("productId")
      .exec();

    if (!!cartItems) res.status(200).json(cartItems);
    else res.status(400).json({ message: "Something went wrong" });
    //
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//! Update Cart
router.route("/update-cart").patch(async (req, res) => {
  try {
    const { id, quantity } = req.body;
    let updateCart;

    if (quantity <= 0) {
      updateCart = await CartSchema.deleteOne({ _id: id });
      //
    } else {
      updateCart = await CartSchema.updateOne({ _id: id }, { quantity });
    }

    if (updateCart.modifiedCount || updateCart.deletedCount)
      res.status(200).json({ message: "Cart Updated Successfully" });
    else res.status(400).json({ message: "Something went wrong" });
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
