'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('petOwners', 'profilePhoto', {
      type: Sequelize.STRING, // Adjust the data type as per your requirements
      allowNull: true, // Set to false if the column should not allow null values
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('petOwners', 'profilePhoto');
  }
};
