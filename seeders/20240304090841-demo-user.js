'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      { username: 'user1', createdAt: new Date(), updatedAt: new Date() },
      { username: 'user2', createdAt: new Date(), updatedAt: new Date() },
    ]);

    const users = await queryInterface.sequelize.query('SELECT id from "Users";');
    const userRows = users[0];
    
    await queryInterface.bulkInsert('Profiles', [
      { bio: 'Bio for user1', UserId: userRows[0].id, createdAt: new Date(), updatedAt: new Date() },
      { bio: 'Bio for user2', UserId: userRows[1].id, createdAt: new Date(), updatedAt: new Date() },
    ]);

    
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
