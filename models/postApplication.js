//One-to-Many: A Post can have multiple Comments.
//postApplication.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostApplication extends Model {
    static associate(models) {
      this.hasMany(models.Comment); //a Post can have multiple comments.
    }
  }
  PostApplication.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PostApplication",
      tableName: "post_applications",
    }
  );
  return PostApplication;
};