'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CommonItems', {
      commonItemsId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      itemName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users', // The table name of the referenced model
          key: 'userId',  // The column in the Users table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('CommonItems');
  }
};