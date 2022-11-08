const db = require('./db');
const User = require('./models/user');
const Product = require('./models/product');

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Product,
  },
};
