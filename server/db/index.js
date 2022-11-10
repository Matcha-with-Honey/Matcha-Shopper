const db = require('./db');
const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');
const Order_Product = require('./models/orderProducts');

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

Order_Product.belongsTo(Product);
Order_Product.belongsTo(Order);
Order.hasMany(Order_Product);
Product.hasMany(Order_Product);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Order_Product,
  },
};
