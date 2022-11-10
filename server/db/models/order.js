const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  order_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isInt: true,
      notEmpty: true,
      min: 0.0,
      max: 10000000.0,
    },
    defaultValue: 0.0,
  },
  purchase_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: false,
  },
  shipping_address: {
    type: DataTypes.STRING,
  },
});

module.exports = Order;
