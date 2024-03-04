'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const posts = await queryInterface.sequelize.query('SELECT id from "Posts";');
    const postRows = posts[0];

    await queryInterface.bulkInsert('Comments', [
      { text: 'Comment for Post 1', PostID: postRows[0].id, createdAt: new Date(), updatedAt: new Date() },
      { text: 'Comment for Post 2', PostID: postRows[1].id, createdAt: new Date(), updatedAt: new Date() },
    ]);
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
