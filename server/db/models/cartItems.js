const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const CartItem = db.define("cartItem", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      notEmpty: true,
      min: 0,
    },
  },
});

module.exports = CartItem;
