'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parametro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Parametro.belongsTo(models.User);
    }
  }
  Parametro.init({
    nome: DataTypes.STRING,
    tempMin: DataTypes.STRING,
    tempMax: DataTypes.STRING,
    umiMin: DataTypes.STRING,
    umiMax: DataTypes.STRING,
    luzMin: DataTypes.STRING,
    luzMax: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Parametro',
  });
  return Parametro;
};