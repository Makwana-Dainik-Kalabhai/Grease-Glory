const { Schema, model } = require("mongoose");

const orderSchema = Schema({
  user: {
    type: Object,
    require: true,
  },
  items: {
    type: Array,
    require: true,
  },
  bill: {
    type: Object,
    require: true,
  },
  payment: {
    type: Object,
    require: true
  }
});

const Order = new model("Order", orderSchema);

module.exports = Order;
