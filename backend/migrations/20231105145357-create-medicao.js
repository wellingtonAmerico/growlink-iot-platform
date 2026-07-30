'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medicaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dataHora: {
        type: Sequelize.DATE
      },
      medicaoLuz: {
        type: Sequelize.FLOAT
      },
      medicaoUmi: {
        type: Sequelize.FLOAT
      },
      medicaoTemp: {
        type: Sequelize.FLOAT
      },
      userID: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
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
    await queryInterface.dropTable('Medicaos');
  }
};