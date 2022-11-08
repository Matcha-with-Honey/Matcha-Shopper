const productsRouter = require('express').Router();
const {
  models: { Product },
} = require('../db');

productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
});
