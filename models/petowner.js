'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class petOwner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  petOwner.init({
    name: DataTypes.STRING,
    contact_number: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    pets: DataTypes.ARRAY(DataTypes.INTEGER),
    bookings: DataTypes.ARRAY(DataTypes.INTEGER),
    address: DataTypes.STRING,
    profilePhoto: DataTypes.STRING,
    email_address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'petOwner',
  });
  return petOwner;
};