const {
  db,
  models: { User, Product, Order },
} = require("../server/db/index.js");
const Order_Products = require("../server/db/models/orderProducts.js");
const { userData, productData } = require("./seedData");

const seed = async () => {
  try {
    await db.sync({ force: true });

    await User.bulkCreate(userData);
    await Product.bulkCreate(productData);

    // mock insert of joined table order_products at time of order insert
    const orderData = [
      {
        purchase_status: false,
        shipping_address: "19 Healthy Way, New York, New York, 10001",
        userId: 3,
      },
    ];
    const orderProductData = [
      { orderId: 1, productId: 1, quanity: 2 },
      { orderId: 1, productId: 3, quanity: 1 },
    ];
    await Order.bulkCreate(orderData);
    await Order_Products.bulkCreate(orderProductData);

    console.log("Successful Seed!");
  } catch (error) {
    console.error("Something went wrong during db seed");
    console.error(error);
    db.close();
  }
};

seed();

module.exports = seed;
