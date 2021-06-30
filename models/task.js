'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Task.init({
    title: {
      type : DataTypes.STRING,
      validate :{
        notEmpty: {
          args: true,
          msg : "title is required"
        }
      }
    },
    category: {
      type : DataTypes.STRING,
      defaultValue: "backlog",
      validate: {
        notEmpty :{
          args: true,
          msg: "category is required"
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg: "description is required"
        }
      }
    },
    deadline: {
      type : DataTypes.DATE,
      validate :{
        notEmpty: {
          args:true,
          msg: "deadline is required"
        },
        isAfter : {
          args: new Date().toISOString(),
          msg : "can't fill the past day"
        }
      }
    },
    signature: {
      type : DataTypes.STRING,
      validate: {
        notEmpty : {
          args: true,
          msg: "signature is required"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty :{
          args: true,
          msg : "User ID is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};