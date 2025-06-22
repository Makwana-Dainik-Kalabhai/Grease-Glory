const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getUserData = async (req, res, next) => {
  const token = req.header("Authorization"); //JSON.parse(req.header("Authorization")).value;

  if (!token)
    return res
      .status(401)
      .json({ error: "Unathorized HTTP, Token not provided" });

  try {
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userData = await User.findOne({ email: verifyToken.email }).select({
      password: 0,
    });

    req.user = userData;
    next();
    //
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

module.exports = getUserData;
