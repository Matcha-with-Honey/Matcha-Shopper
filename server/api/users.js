const usersRouter = require('express').Router();
const {
  models: { User, Order },
} = require('../db');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');
module.exports = usersRouter;

usersRouter.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

usersRouter.get('/:userId', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'role'],
      },
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

usersRouter.delete(
  '/:userId',
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId);
      await user.destroy();
      res.send(user);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.put('/:userId', requireToken, async (req, res, next) => {
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
