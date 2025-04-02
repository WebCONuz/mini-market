const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("../models/order.model");
const OrderProduct = require("./order_product.model");

const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// assocoations
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: "orderId" });
Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: "productId",
});

module.exports = Product;
