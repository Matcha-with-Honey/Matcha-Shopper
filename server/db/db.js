const { Sequelize } = require('sequelize');
const dbUrl = process.env.DATABASE_URL || `postgres://localhost:5432/matcha`;

let config;
if (process.env.DATABASE_URL) {
  config = {
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };
} else {
  config = {
    logging: false,
  };
}
const db = new Sequelize(dbUrl, config);

module.exports = db;

//THIS IS HOW WE HAD IT SET UP BEFORE:
// const db = new Sequelize('postgres://localhost:5432/matcha', {
//   logging: false,
// });

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
