import sequelize from "sequelize";
import db from "../config/Database.js";
import Roles from "../models/Roles.js";
const { DataTypes } = sequelize;

const Users = db.define('users', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    no_hp: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,

        validate: {
            isInt: true,
            notEmpty: true
        }
    }
},{
    freezeTableName: true
})

Roles.hasOne(Users);
Users.belongsTo(Roles, { foreignKey: "roleId" });

export default Users;