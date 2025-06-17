const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {

    await mongoose.connect(URI);
    console.log("Connected Successfully");
    //
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDb;
