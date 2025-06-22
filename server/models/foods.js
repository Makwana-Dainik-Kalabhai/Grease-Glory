const { Schema, model } = require("mongoose");

const FoodSchema = Schema({
  category: {
    type: String,
    require: true,
  },
  veg: {
    type: Boolean,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
  },
  offer_price: {
    type: Number,
  },
});

const Foods = new model("foods", FoodSchema);

module.exports = Foods;
