'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('pets', 'vaccinePhoto', {
      type: Sequelize.STRING, // Adjust the data type as per your requirements
      allowNull: true, // Set to false if the column should not allow null values
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('pets', 'vaccinePhoto');
  }
};