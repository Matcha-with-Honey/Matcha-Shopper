const ordersRouter = require("express").Router();
const {
  models: { Product, Order },
} = require("../db");

ordersRouter.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: { model: Product },
      where: {
        orderId: req.params.id,
      },
    });
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: { model: Product },
    });
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/", async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.put("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    order.update(req.body);
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.delete("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.destroy();
    res.send(order);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
