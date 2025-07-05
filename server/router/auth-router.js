const express = require("express");
const router = express.Router();
const User = require("../models/user");
const signupSchema = require("../validator/signup");
const loginSchema = require("../validator/login");
const validate = require("../middleware/validate");

//! Register Now
router.route("/auth/signup").post(validate(signupSchema), async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist)
      return res.status(400).json({ message: "User Already Exist" });

    const user = await User.create({ username, email, password, phone });

    return res.status(201).json({
      message: "signUp Successfully",
      token: await user.generateToken(),
      userId: user._id.toString(),
    });
    //
  } catch (err) {
    return res.json({ message: err.message });
  }
});



//! Login Now
router.route("/auth/login").post(validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      const validPassword = await userExist.comparePassword(password);

      if (validPassword) {
        return res.status(200).send({
          message: "Login Successfully",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
      } else {
        return res.status(401).json({ message: "Invalid Password" });
      }
    }
    //
    else return res.status(400).json({ message: "Credential not Found" });
    //
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
