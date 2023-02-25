'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.transaksi, {
        foreignKey: "id_transaksi",
        as: "transaksi"
      })
      this.belongsTo(models.product, {
        foreignKey: "id_product",
        as: "product"
      })
    }
  };
  detail_transaksi.init({
    id_transaksi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_product:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qty: DataTypes.DOUBLE,
    price: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'detail_transaksi',
    tableName: "detail_transaksi",
  });
  return detail_transaksi;
};