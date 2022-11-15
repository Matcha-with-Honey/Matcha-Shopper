'use strict';

const app = require('./server');
const { db } = require('./server/db');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const init = async () => {
  try {
    if (process.env.SEED === 'true') {
      await seed();
    } else {
      await db.sync();
      console.log('db synced');
    }
    app.listen(PORT, () =>
      console.log(`Listening on port ${PORT}, join the PARTAY!`)
    );
  } catch (error) {
    console.log(error);
  }
};

init();
