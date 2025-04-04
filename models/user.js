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
      // define association here
      this.hasMany(models.ShopList, {
        foreignKey: 'userId',
        as: 'ShopLists',
      });

      this.hasMany(models.CommonItem, {
        foreignKey: 'userId',
        as: 'CommonItems',
      });

      this.belongsToMany(models.ShopList, {
        through: 'UserShopLists',
        foreignKey: 'userId',
        as: 'sharedShopLists'
      });

      // User.belongsToMany(models.ShopList, {
      //   through: models.UserShopLists,
      //   foreignKey: "userId",
      //   as: "sharedShopLists",
      // });

    }

    toJSON() {
      return { ...this.get(), password: undefined, }
    }

  }
  User.init({
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });
  return User;
};