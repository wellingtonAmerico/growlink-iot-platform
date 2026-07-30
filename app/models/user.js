'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Sensor);
      User.hasMany(models.Parametro);
      User.hasMany(models.Medicao);
    }
  }
  User.init({
    nome: DataTypes.STRING,
    user: DataTypes.STRING,
    senha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};