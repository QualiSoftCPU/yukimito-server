'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('pets', 'vaccinated', {
      type: Sequelize.BOOLEAN, 
      defaultValue: false, 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('pets', 'vaccinated');
  }
};
