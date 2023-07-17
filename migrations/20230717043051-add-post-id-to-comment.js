'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
    await queryInterface.addColumn("comments", "PostId", {
      type: Sequelize.INTEGER,
      references: {
        model: "posts", 
        key: "id", 
      },
      onUpdate: "CASCADE", 
      onDelete: "SET NULL", 
    });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn("comments", "UserId"); //posts are linked with userId
  }
};
