'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('admins', 'role', {
      type: Sequelize.ENUM('admin', 'superadmin'),
      allowNull: false,
      defaultValue: 'admin',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('admins', 'role');
  }
};
