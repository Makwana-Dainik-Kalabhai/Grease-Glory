const { Schema, model } = require("mongoose");
const FoodSchema = require("./foods");

const CartSchema = Schema({
  productId: { type: Schema.Types.ObjectId, ref: FoodSchema },
  email: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
});

const Cart = new model("Cart", CartSchema);

module.exports = Cart;
