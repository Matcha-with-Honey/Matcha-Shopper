const {
  db,
  models: { User, Product },
} = require("../server/db/index.js");
const { userData, productData } = require("./seedData");

const seed = async () => {
  try {
    await db.sync({ force: true });

    await User.bulkCreate(userData);
    await Product.bulkCreate(productData);
    console.log("Successful Seed!");
  } catch (error) {
    console.error("Something went wrong during db seed");
    console.error(error);
    db.close();
  }
};

seed();

module.exports = seed;
