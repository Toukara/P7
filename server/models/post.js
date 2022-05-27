"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    //   models.Post.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: false,
    //     },
    //   });
    // }
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
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );

  return Post;
};
