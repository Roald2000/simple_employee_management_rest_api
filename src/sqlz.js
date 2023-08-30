const { Sequelize } = require("sequelize");

const { env } = process;

const { host, port, user, password, database } = env;

const sequelize = new Sequelize(
  database ?? "employee_db",
  user ?? "root",
  password ?? "",
  {
    host: host ?? "localhost",
    port: port ?? 3306,
    dialect: "mysql",
    // logging: false,
  }
);




//  where: Sequlize.literal("CONCAT(col,col) LIKE %search%")

module.exports = {
  sequelize,
};
