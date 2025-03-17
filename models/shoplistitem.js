'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShopListItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ShopList, {
        foreignKey: 'shopListId',
        as: 'ShopLists',
      });
    }
  }
  ShopListItem.init({
    shopListItemsId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    itemInfo: DataTypes.STRING,
    state: {
      type: DataTypes.ENUM("completed", "not-completed"),
      defaultValue: 'not-completed',
    }
  }, {
    sequelize,
    modelName: 'ShopListItem',
  });
  return ShopListItem;
};