import sequelize from "sequelize";
import db from "../config/Database.js";
import Users from "./Users.js";
const { DataTypes } = sequelize;

const CategoryMenu = db.define(
  "category_menu",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
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
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(CategoryMenu);
CategoryMenu.belongsTo(Users, { foreignKey: "userId" });
export default CategoryMenu;
