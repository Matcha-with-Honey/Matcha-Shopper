const cartRouter = require('express').Router();
const {
  models: { Product, Order, Order_Product },
} = require('../db');

cartRouter.get('/:orderId/:productId', async (req, res, next) => {
  try {
    const data = await Order_Product.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId,
      },
    });
    const item = data;
    res.status(200).send(item);
  } catch (error) {
    next(error);
  }
});

cartRouter.get('/:orderId', async (req, res, next) => {
  try {
    const items = await Order_Product.findAll({
      include: [{ model: Product }, { model: Order }],
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
    const data = await Order_Product.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId,
      },
    });
    const item = data;
    await item.update(req.body);
    res.status(200).send(item);
  } catch (error) {
    next(error);
  }
});

cartRouter.put('/:orderId', async (req, res, next) => {
  try {
    const data = await Order_Product.findAll({
      where: {
        orderId: req.params.orderId,
      },
    });
    const items = data;
    if (items) {
      await Order_Product.update(req.body, {
        where: {
          orderId: req.params.orderId,
        },
      });
      res.status(200).send(items);
    } else {
      console.log('no items to update');
    }
  } catch (error) {
    next(error);
  }
});

cartRouter.delete('/:orderId/:productId', async (req, res, next) => {
  try {
    const data = await Order_Product.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId,
      },
    });
    const item = data;
    await item.destroy();
    res.status(200).send(item);
  } catch (error) {
    next(error);
  }
});
module.exports = cartRouter;
