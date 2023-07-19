'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.addColumn("comments", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users", 
        key: "id", 
      },
      onUpdate: "CASCADE", 
      onDelete: "SET NULL", 
    });
  },

  async down (queryInterface, Sequelize) {
 
    await queryInterface.removeColumn("comments", "UserId");
  },
};
