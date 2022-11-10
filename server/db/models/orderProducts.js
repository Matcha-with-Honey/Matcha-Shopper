const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Order_Product = db.define('order_product', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
    defaultValue: 1,
  },
});

module.exports = Order_Product;
