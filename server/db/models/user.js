const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = db.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
        notEmpty: true,
        isEmail: true
      },
    unique: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: true
      }
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
          notEmpty: true
        }
  }, 
  phone: {
    type: DataTypes.STRING(12),
    allowNull: true,
  }, 
  role:{
    type: DataTypes.ENUM('member', 'admin', 'engineer'), 
    defaultValue:{
      'member'
    },
    allowNull: false,
  }
});

User.prototype.correctPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.SECRET_KEY);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async (token) => {
  try {
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = User.findByPk(id);
    if (!user) {
      throw 'no';
    }
    return user;
  } catch (err) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

// User.beforeCreate(async (user) => {
//   const hashedPassword = await bcrypt.hash(user.password, 10);
//   user.password = hashedPassword;
// });

const hashPassword = async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));

module.exports = User;
