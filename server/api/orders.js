const ordersRouter = require('express').Router();
const {
  models: { Order },
} = require('../db');
const Order_Product = require('../db/models/orderProducts');

ordersRouter.get('/recent/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
      },
      group: 'order.id',
      order: [['createdAt', 'DESC']],
    });

    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get('/purchases/:userId', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.params.userId,
        purchase_status: true,
      },
      include: {
        model: Order_Product,
      },
      order: [['updatedAt', 'DESC']],
    });

    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: { model: Order_Product },
    });
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    order.update(req.body);
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.delete('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.destroy();
    res.send(order);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
