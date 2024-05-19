'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  booking.init({
    petOwnerId: DataTypes.INTEGER,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE,
    service_type: DataTypes.STRING,
    petList: DataTypes.ARRAY(DataTypes.INTEGER),
    status: DataTypes.STRING,
    total_price: DataTypes.FLOAT,
    reasonOfRejection: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'booking',
  });
  return booking;
};