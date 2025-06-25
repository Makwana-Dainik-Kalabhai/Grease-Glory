const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/order");
const Cart = require("../models/cart");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//! Create Order for Razorpay Payment
router.route("/order/create-order").post(async (req, res) => {
  const options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: "order_rcptid_" + Math.floor(Date.now() / 1000),
  };

  try {
    const order = await razorpay.orders.create(options);

    res.status(201).json(order);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//! Verify Payment then Place Order
router.route("/order/place-order").post(async (req, res) => {
  try {
    //* If payment is done via Razorpay
    if (req.body.payment.status) {
      const { order_id, signature, user, items, bill, payment } = req.body;

      const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(order_id + "|" + payment.payment_id)
        .digest("hex");

      if (generated_signature === signature) {
        //
        const orderStatus = await Order.insertOne({
          user,
          items,
          bill,
          payment,
        });

        if (!!orderStatus) {
          items.map(async (ele) => {
            await Cart.deleteOne({ _id: ele._id });
          });
          return res.status(201).json({ message: "Order placed successfully" });
        } else return res.status(400).json({ message: "Something went wrong" });
        //
      } else {
        return res
          .status(500)
          .json({ message: "Payment error, Try again later" });
      }
    }

    //* If Payment is via Cash on Delivery method
    else {
      const orderStatus = await Order.insertOne(req.body);

      if (!!orderStatus) {
        items.map(async (ele) => {
          await Cart.deleteOne({ _id: ele._id });
        });
        return res.status(201).json({ message: "Order placed successfully" });
      } else return res.status(400).json({ message: "Something went wrong" });
      //
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error: " + err.message });
  }
});

module.exports = router;
