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

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.put('/:id', async (req, res, next) => {
  try {
    const productToUpdate = await Product.findByPk(req.params.id);
    productToUpdate.update(req.body);
    res.status(200).send(productToUpdate);
  } catch (error) {
    next(error);
  }
});

productsRouter.delete('/:id', async (req, res, next) => {
  try {
    const productToDelete = await Product.findByPk(req.params.id);
    await productToDelete.destroy();
    res.send(productToDelete);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
