'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommonItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'CommonItems',
      });
    }
  }
  CommonItem.init({
    commonItemsId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'CommonItem',
  });
  return CommonItem;
};