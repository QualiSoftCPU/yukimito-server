'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pet.init({
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    birthday: DataTypes.DATE,
    size: DataTypes.STRING,
    petOwnerId: DataTypes.INTEGER,
    vaccinePhoto: DataTypes.STRING,
    vaccinated: DataTypes.BOOLEAN,
    petPhoto: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'pet',
  });
  return pet;
};