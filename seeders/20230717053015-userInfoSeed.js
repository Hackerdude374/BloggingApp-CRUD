'use strict';
const bcrypt = require('bcrypt.js');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  //users
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "jerry",
          email: "jerry@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
          password: await bcrypt.hash("password", 10),
        },
      ],
      {}
    );
    const users = await queryInterface.sequelize.query(`select ID from users`);
    const userId = users[0][0].id;
    //posts 
    await queryInterface.bulkInsert(
      "posts",
      [
        {
          title: "my new recipe",
          description: "i made pizza",
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: userId,
        },
      ],
      {}
    );
    const posts = await queryInterface.sequelize.query(`SELECT id FROM posts`);
    const postId = posts[0][0].id;
      //comments
    await queryInterface.bulkInsert(
      "comments",
      [
        {
          content:
            "i love pizza, it is the best.",
          createdAt: new Date(),
          updatedAt: new Date(),
          // a comment has a user and post.
          UserId: userId,
          PostId: postId,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("posts", null, {});
    await queryInterface.bulkDelete("comments", null, {});
  }
};
