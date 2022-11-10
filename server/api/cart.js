const cartRouter = require('express').Router();
const {
  models: { Product, Order, Order_Product },
} = require('../db');

cartRouter.get('/:orderId', async (req, res, next) => {
  try {
    const items = await Order_Product.findAll({
      where: {
        orderId: req.params.orderId,
      },
    });
    res.status(200).send(items);
  } catch (error) {
    next(error);
  }
});

cartRouter.post('/', async (req, res, next) => {
  try {
    const item = req.body;
    await Order_Product.create(item, {
      include: [
        {
          model: Product,
        },
        { model: Order },
      ],
    });
    res.status(201).send(item);
  } catch (error) {
    next(error);
  }
});

module.exports = cartRouter;
