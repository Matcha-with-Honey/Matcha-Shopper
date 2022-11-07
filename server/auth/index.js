const authRouter = require('express').Router();
const {
  models: { User },
} = require('../db');

authRouter.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists.');
    } else {
      next(error);
    }
  }
});

authRouter.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
