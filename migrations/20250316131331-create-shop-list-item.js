'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShopListItems', {
      shopListItemsId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      itemName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.ENUM('completed', 'not-completed'),
        defaultValue: 'not-completed',
        allowNull: false,
      },
      shopListId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'ShopLists', // The table name of the referenced model
          key: 'shopListId',  // The column in the Users table
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
    await queryInterface.dropTable('ShopListItems');
  }
};