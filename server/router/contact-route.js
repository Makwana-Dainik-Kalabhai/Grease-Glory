const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

router.route("/contact").post(async (req, res) => {
  try {
    const { username, email, phone, message } = req.body;

    const ContactData = await Contact.create({
      username,
      email,
      phone,
      message,
    });

    if (ContactData)
      return res.status(201).json({ msg: "Contact message sent successfully" });
    else return res.status(400).json({ error: "Something went wrong" });
    //
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
