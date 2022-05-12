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
      models.User.hasMany(models.Post);
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      bio: DataTypes.STRING,
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      avatar: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "https://www.screenfeed.fr/wp-content/uploads/2013/10/default-avatar.png",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
