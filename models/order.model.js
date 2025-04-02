const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");

const Order = sequelize.define(
  "Order",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(["start", "proccess", "complete"]),
      allowNull: false,
      defaultValue: "start",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  }
);

// assocoations
User.hasMany(Order, {
  foreignKey: "user_id",
  as: "orders",
  onDelete: "CASCADE",
  onUpdate: "RESTRICT",
});

Order.belongsTo(User, {
  foreignKey: {
    name: "user_id",
  },
});

module.exports = Order;
