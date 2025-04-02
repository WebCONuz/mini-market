const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Order = require("./order.model");
const Product = require("./product.model");

const OrderProduct = sequelize.define("OrderProduct", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
  },
  productId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = OrderProduct;
