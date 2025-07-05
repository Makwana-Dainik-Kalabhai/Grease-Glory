const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getUserData = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res
      .status(401)
      .json({ message: "Unathorized HTTP, Token not provided" });

  try {
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!verifyToken)
      return res.status(400).json({ message: "Unable to fetch user-data" });

    const userData = await User.findOne({ email: verifyToken.email }).select({
      password: 0,
    });

    req.user = userData;
    next();
    //
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = getUserData;
