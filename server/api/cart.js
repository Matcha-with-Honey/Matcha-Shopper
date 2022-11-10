const cartRouter = require('express').Router();
const {
  models: { Product, Order, Order_Product },
} = require('../db');

cartRouter.get('/:orderId', async (req, res, next) => {
  try {
    const items = await Order_Product.findAll({
      include: [{ model: Product }],
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

cartRouter.put('/:orderId/:productId', async (req, res, next) => {
  try {
    const data = await Order_Product.findAll({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId,
      },
    });
    const item = data[0];
    await item.update(req.body);
    res.status(200).send(item);
  } catch (error) {
    next(error);
  }
});

cartRouter.delete('/:orderId/:productId', async (req, res, next) => {
  try {
    const data = await Order_Product.findAll({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId,
      },
    });
    const item = data[0];
    await item.destroy();
    res.status(200).send(item);
  } catch (error) {
    next(error);
  }
});
module.exports = cartRouter;
