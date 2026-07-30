'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sensor.belongsTo(models.User);
    }
  }
  Sensor.init({
    nomeSensor: DataTypes.STRING,
    unidadeMedida: DataTypes.STRING,
    status: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sensor',
  });
  return Sensor;
};