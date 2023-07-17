'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("comments", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users", // you can use the table name here not model
        key: "id", // primary key
      },
      onUpdate: "CASCADE", //
      onDelete: "SET NULL", //
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("comments", "UserId");
  }
};
