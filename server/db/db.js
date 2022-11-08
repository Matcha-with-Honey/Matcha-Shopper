const { Sequelize } = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/matcha', {
  logging: false,
});

module.exports = db;

// testing the connection to the database:
// async function testing() {
//   try {
//     await db.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:'), error;
//   }
// }

// testing();
