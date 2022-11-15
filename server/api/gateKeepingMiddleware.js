const {
  models: { User },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (user.role !== 'admin') {
      return res.status(403).send('You need admin privileges to access this!');
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { requireToken, isAdmin };
