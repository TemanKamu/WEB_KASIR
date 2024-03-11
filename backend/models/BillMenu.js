import sequelize from "sequelize";
import db from "../config/Database.js";
import Menu from "./Menu.js";
import Users from "./Users.js";
const { DataTypes } = sequelize;

const BillMenu = db.define(
  "bill_menu",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        isInt: true,
        notEmpty: true,
      },
    },
    noTransaction: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,

      validate: {
        notEmpty: true,
      },
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        isInt: true,
        notEmpty: true,
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        isInt: true,
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        isInt: true,
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(BillMenu);
BillMenu.belongsTo(Users, { foreignKey: "userId" });
Menu.hasMany(BillMenu);
BillMenu.belongsTo(Menu, { foreignKey: "menuId" });
export default BillMenu;
