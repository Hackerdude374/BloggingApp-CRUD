//Many-to-One: A Comment belongs to a User and a Post.
//commentApplication.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
        //a comment belongs to a user and post. use belongsTo for many to One
      this.belongsTo(models.User);
      this.belongsTo(models.Post);
    }
  }
  Comment.init(
    {
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "comments",
    }
  );
  return Comment;
};