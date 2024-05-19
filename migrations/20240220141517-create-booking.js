'use strict';

const { all } = require('../routes/routes');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      petOwner: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      checkIn: {
        type: Sequelize.DATE
      },
      checkOut: {
        type: Sequelize.DATE
      },
      service_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pets: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total_price: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings');
  }
};