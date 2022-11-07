const db = require('./db');
const User = require('./models/user');

//associations could go here!

module.exports = {
  db,
  models: {
    User,
  },
};
