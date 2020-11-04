'use strict';
const {
  Model
} = require('sequelize');

const {hashingPassword} = require('../helpers/bcrypt.js')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        args: false,
        msg: `Email has been registered!`,
      },
      validate: {
        isEmail: {
          args: true,
          msg: `Invalid email format!`,
        },
        notEmpty: {
          args: true,
          msg: `Email is required!`,
        },
      },
    },
    password:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is required!'
        },
        len: {
          args: [6, 15],
          msg: 'Password must be 6-15 characters!'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        args: false,
        msg: `Username has been registered!`,
      },
      validate: {
        notEmpty: {
          args: true,
          msg: `Username is required!`,
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) { hashingPassword(user) }
    }
  });
  return User;
};