const cartRouter = require('express').Router();
const {
  models: { Product, Order, Order_Product },
} = require('../db');

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

cartRouter.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: Product,
        },
        { model: Order },
      ],
      where: {
        orderId: req.params.id,
      },
    });
    res.status(200).send(order.products);
  } catch (error) {
    next(error);
  }
});

module.exports = cartRouter;
