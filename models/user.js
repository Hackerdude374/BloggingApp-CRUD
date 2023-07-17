//One-to-Many: A User can have multiple Posts and Comments.
//userApplication.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
        //hasMany function means one to Many
         //a User can have multiple posts and comments (so make sure u hgave both comments and post)
      this.hasMany(models.Comment); //comment
      this.hasMany(models.Post); //post
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      //day 22
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};