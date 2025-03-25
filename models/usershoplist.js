'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserShopList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.User, { foreignKey: "userId" });
      // this.belongsTo(models.ShopList, { foreignKey: "shopListId" });

      // New code
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      this.belongsTo(models.ShopList, {
        foreignKey: "shopListId",
        as: "shopList", // Alias for referencing ShopList
      });
    }

    toJSON() {
      return {
        ...this.get(), user: {
          password: undefined,
        }
      }
    }

  }
  UserShopList.init({
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId'
      }
    },
    shopListId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'ShopLists',
        key: 'shopListId'
      }
    }
  }, {
    sequelize,
    modelName: 'UserShopList',
  });
  return UserShopList;
};