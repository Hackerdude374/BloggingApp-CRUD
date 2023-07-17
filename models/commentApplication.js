//Many-to-One: A Comment belongs to a User and a Post.
//commentApplication.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommentApplication extends Model {
    static associate(models) {
        //a comment belongs to a user and post. use belongsTo for many to One
      this.belongsTo(models.UserApplication);
      this.belongsTo(models.PostApplication);
    }
  }
  CommentApplication.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CommentApplication",
      tableName: "comment_applications",
    }
  );
  return CommentApplication;
};