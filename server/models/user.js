const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
});

//* bcrypt Password
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(user.password, salt);
    user.password = hashPass;
    //
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//* JWT -> Json Web Token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        _id: this._id.toString(),
        username: this.username,
        email: this.email,
        phone: this.phone,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "10d",
      }
    );
    //
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//* Compare Password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = new model("User", userSchema);

module.exports = User;
