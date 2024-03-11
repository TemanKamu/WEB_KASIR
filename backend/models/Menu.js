import sequelize from "sequelize";
import db from "../config/Database.js";
import CategoryMenu from "./CategoryMenu.js";
import Users from "./Users.js";
const { DataTypes } = sequelize;

const Menu = db.define(
  "menus",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        isInt: true,
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notEmpty: true,
      },
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,

      validate: {
        notEmpty: false,
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
    picture: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notEmpty: true,
      },
    },
    picture_url: {
      type: DataTypes.TEXT,
      allowNull: false,

      validate: {
        notEmpty: true,
      },
    },
    categoryId: {
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

Users.hasMany(Menu);
Menu.belongsTo(Users, { foreignKey: "userId" });
CategoryMenu.hasMany(Menu, { foreignKey: "categoryId" });
Menu.belongsTo(CategoryMenu, { foreignKey: "categoryId" });

export default Menu;
