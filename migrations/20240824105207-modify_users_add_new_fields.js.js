module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.addColumn('News',"createdById",{
      //   type: Sequelize.STRING,
      //   allowNull: false
      // }),
      // queryInterface.addColumn('Visitors', "visitorsComeingFor", {
      //   type: Sequelize.STRING,
      //   defaultValue: "",
      //   allowNull: true
      // }),
      // queryInterface.removeColumn(
      //   'Visitors',
      //   'userType'
      // )
      // queryInterface.renameColumn('ShopLists', 'shopName', 'shopListName'),
      // queryInterface.renameColumn('ShopLists', 'listInfo', 'description'),

      // queryInterface.renameColumn('ShopListItems', 'name', 'itemName'),
      // queryInterface.renameColumn('ShopListItems', 'itemInfo', 'description'),
    ]);
  },
  down: (queryInterface) => {
  },
};
