"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  // Returns true if the request was successful.
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      attachment: DataTypes.STRING,
      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      dislikes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      likesUsers: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      dislikesUsers: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );

  return Post;
};
