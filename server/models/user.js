"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post, {
        foreignKey: "authorId",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      bio: DataTypes.STRING,
      authLevel: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "0",
      },
      avatar: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "default_avatar0.png",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
