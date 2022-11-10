const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "r_his",
  "rvg2",
  "Dent@1401",
  {
    host: "172.16.0.4",
    dialect: "mssql"
  }
);

module.exports = sequelize;
