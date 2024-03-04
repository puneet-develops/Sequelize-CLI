'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const students = await queryInterface.sequelize.query('SELECT id from "Students";');
    const courses = await queryInterface.sequelize.query('SELECT id from "Courses";');
    const studentRows = students[0];
    const courseRows = courses[0];

    await queryInterface.bulkInsert('StudentCourses', [
      { StudentId: studentRows[0].id, CourseId: courseRows[0].id, createdAt: new Date(), updatedAt: new Date() },
      { StudentId: studentRows[0].id, CourseId: courseRows[1].id, createdAt: new Date(), updatedAt: new Date() },
      { StudentId: studentRows[1].id, CourseId: courseRows[1].id, createdAt: new Date(), updatedAt: new Date() },
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
    await queryInterface.bulkDelete('StudentCourses', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
