'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const teams = await queryInterface.sequelize.query('SELECT id from "Teams";');
    const teamRows = teams[0];

    await queryInterface.bulkInsert('Players', [
      { name: 'Player 1', TeamId: teamRows[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Player 2', TeamId: teamRows[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Player 3', TeamId: teamRows[1].id, createdAt: new Date(), updatedAt: new Date() },
    ])
    /**
     * 
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
