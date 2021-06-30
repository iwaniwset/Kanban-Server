'use strict';
const {
  Model
} = require('sequelize');
const { hassPass } = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task, {
        foreignKey: {
          name: "UserId"
        }
      })
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      unique: {
        args: true,
        msg : "Email is taken by another user"
      },
      validate: {
        isEmail : {
          args: true,
          msg : "Please check email Format"
        },
        notEmpty: {
          args: true,
          msg : "Email is required"
        }
      }
    },     
    password: {
      type : DataTypes.STRING,
      validate :{
        notEmpty: {
          args: true,
          msg : "Password is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, option) =>{
        user.password = hassPass (user.password)
      }
    }
  });
  return User;
};