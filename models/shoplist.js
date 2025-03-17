'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShopList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'shopingLists',
      });
      this.hasMany(models.ShopListItem, {
        foreignKey: 'shopListId',
        as: 'shopListItems',
      });
    }
  }
  ShopList.init({
    shopListId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    listName: DataTypes.STRING,
    listInfo: DataTypes.STRING,
    state: {
      type: DataTypes.ENUM("completed", "not-completed"),
      defaultValue: 'not-completed',
    }
  }, {
    sequelize,
    modelName: 'ShopList',
  });
  return ShopList;
};