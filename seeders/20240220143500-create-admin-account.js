'use strict';
const bcrypt = require('bcrypt');
const db = require("../models");
const Admin = db.admin;

const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const admin = await Admin.findOne({ where: { username } });
 
    if (!admin) {
      await Admin.create({
        username: username,
        password: hashedPassword
      });
    }
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admins', null, {});
  }
  
};

