const db = require("./db");
const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");
const Order_Products = require("./models/orderProducts");

//associations could go here!
Order.belongsToMany(Product, { through: Order_Products });
Product.belongsToMany(Order, { through: Order_Products });

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Order_Products,
  },
};
