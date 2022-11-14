const { Sequelize } = require('sequelize');

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
  });
} else {
  // the application is executed on the local machine
  const db = new Sequelize('postgres://localhost:5432/matcha', {
    logging: false,
  });
}

// const db = new Sequelize('postgres://localhost:5432/matcha', {
//   logging: false,
// });

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
