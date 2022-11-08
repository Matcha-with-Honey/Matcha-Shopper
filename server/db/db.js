const { Sequelize } = require("sequelize");

const db = new Sequelize("postgres://localhost:5432/matcha", {
  logging: false,
});

module.exports = db;
