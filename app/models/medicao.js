'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Medicao.belongsTo(models.User);
    }
  }
  Medicao.init({
    dataHora: DataTypes.DATE,
    medicaoLuz: DataTypes.FLOAT,
    medicaoUmi: DataTypes.FLOAT,
    medicaoTemp: DataTypes.FLOAT,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Medicao',
  });
  return Medicao;
};