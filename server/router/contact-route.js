const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

router.route("/user/contact").post(async (req, res) => {
  try {
    const { username, email, phone, message } = req.body;

    const ContactData = await Contact.create({
      username,
      email,
      phone,
      message,
    });

    if (ContactData)
      return res
        .status(201)
        .json({ message: "Contact message sent successfully" });
    else return res.status(400).json({ message: "Something went wrong" });
    //
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
