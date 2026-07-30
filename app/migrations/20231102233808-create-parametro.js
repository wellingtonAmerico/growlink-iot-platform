'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Parametros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      tempMin: {
        type: Sequelize.STRING
      },
      tempMax: {
        type: Sequelize.STRING
      },
      umiMin: {
        type: Sequelize.STRING
      },
      umiMax: {
        type: Sequelize.STRING
      },
      luzMin: {
        type: Sequelize.STRING
      },
      luzMax: {
        type: Sequelize.STRING
      },
      userID: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
    await queryInterface.dropTable('Parametros');
  }
};