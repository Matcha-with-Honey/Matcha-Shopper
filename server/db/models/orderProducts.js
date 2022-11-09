const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Order_Products = db.define('order_products', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = Order_Products;
