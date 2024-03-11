import sequelize from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = sequelize;

const Roles = db.define(
  "roles",
  {
    name: {
      type: DataTypes.STRING,
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

export default Roles;
