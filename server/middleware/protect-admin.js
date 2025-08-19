const User = require("../models/user");
const jwt = require("jsonwebtoken");

const protectAdminRoute = async (req, res, next) => {
  const token = req.header("Authorization");
  
  if (!token)
    return res
      .status(401)
      .json({ message: "Unathorized HTTP, Token not provided" });

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!verifyToken)
      return res.status(401).json({ message: "Unable to fetch Data" });


    const userData = await User.findOne({ _id: verifyToken._id }).select({
      password: 0,
    });

    if (!userData.isAdmin)
      return res
        .status(401)
        .json({ message: "You are not admin, so you can not access it" });

    next();
    //
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = protectAdminRoute;
