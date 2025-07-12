const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/order");
const Cart = require("../models/cart");
const getUserData = require("../middleware/user-data");
const Foods = require("../models/foods");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//
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

//
//! Verify Payment then Place Order
router.route("/order/place-order").post(getUserData, async (req, res) => {
  try {
    let date = new Date().toLocaleDateString("en-US");
    let time = new Date().getTime();
    let user = req.user;
    let { items, bill, payment } = req.body;

    items.map(async (ele) => {
      const upQuantity = await Foods.updateOne(
        { _id: ele.productId._id },
        { $inc: { quantity: -ele.quantity } }
      );
    });

    //* If payment is done via Razorpay
    if (req.body.payment.status) {
      const { order_id, signature } = req.body;

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
          date,
          time,
          status: "Processing",
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
      const orderStatus = await Order.insertOne({
        user,
        items,
        bill,
        payment,
        date,
        time,
        status: "Processing",
      });

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

//
//! Get All Orders of particular user
router.route("/user/orders").get(async (req, res) => {
  try {
    const email = req.header("Email");
    const today = new Date();
    let time =
      req.header("time") != "All"
        ? new Date(
            today.setDate(today.getDate() - req.header("time"))
          ).getTime()
        : 0;
    const status = req.header("status");
    const orderId = req.header("orderId");

    let myOrders;

    if (!!orderId && orderId.length >= 24) {
      myOrders = await Order.find({
        ["user.email"]: email,
        _id: orderId,
      }).sort({ time: -1 });
    }
    //
    else if (status != "All") {
      myOrders = await Order.find({
        ["user.email"]: email,
        time: { $gt: time },
        status,
      }).sort({ time: -1 });
    }
    //
    else if (status == "All") {
      myOrders = await Order.find({
        ["user.email"]: email,
        time: { $gt: time },
      }).sort({ time: -1 });
    }
    //
    else if (status != "All") {
      myOrders = await Order.find({
        ["user.email"]: email,
        status,
      }).sort({ time: -1 });
    }
    //
    else {
      myOrders = await Order.find({
        ["user.email"]: email,
      }).sort({ time: -1 });
    }

    if (myOrders !== null || myOrders !== undefined)
      return res.status(200).json(myOrders);
    else return res.status(400).json({ message: "Something went wrong." });
    //
    //
  } catch (err) {
    //
    return res.status(500).json({ message: err.message });
  }
});

//! Cancel Order
router.route("/cancel-order").patch(async (req, res) => {
  try {
    const { _id, items } = req.body;

    const cancel = await Order.updateOne({ _id }, { status: "Cancelled" });

    if (cancel.modifiedCount) {
      items.map(async (ele) => {
        const quantity = await Foods.updateOne(
          { _id: ele.productId._id },
          { $inc: { quantity: +ele.quantity } }
        );
      });

      res.status(200).json({ message: "Order cancelled successfully" });
    } else res.status(400).json({ message: "Something went wrong" });

    //
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
