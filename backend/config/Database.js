import sequelize from "sequelize";

const db = new sequelize("cashier", "root", "", {
    dialect: "mysql",
    host: "localhost"
})

export default db;