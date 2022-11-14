const usersRouter = require('express').Router();
const {
  models: { User, Order },
} = require('../db');
module.exports = usersRouter;

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

usersRouter.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: Order,
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', async (req, res, next) => {
  try {
    const { username, password, first_name, last_name, email, phone } =
      req.body;
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.delete('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    await user.destroy();
    res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.put('/:userId', async (req, res, next) => {
  try {
    const { username, password, first_name, last_name, email, phone } =
      req.body;
    const user = await User.findByPk(req.params.userId);
    const response = await user.update(req.body);
    res.send(response);
  } catch (error) {
    next(error);
  }
});
