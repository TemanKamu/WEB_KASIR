import sequelize from "sequelize";
import db from "../config/Database.js";
import BillMenu from "./BillMenu.js";
import Users from "./Users.js";
const { DataTypes } = sequelize;

const BillDetails = db.define(
  "bill_details",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        isInt: true,
        notEmpty: true,
      },
    },
    billMenuId: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
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
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        isInt: true,
        notEmpty: true,
      },
    },
    cash: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        isInt: true,
        notEmpty: true,
      },
    },
    change: {
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
BillMenu.hasMany(BillDetails, { foreignKey: "billMenuId" });
BillDetails.belongsTo(BillMenu, { foreignKey: "billMenuId" });
Users.hasMany(BillDetails);
BillDetails.belongsTo(Users, { foreignKey: "userId" });
export default BillDetails;
