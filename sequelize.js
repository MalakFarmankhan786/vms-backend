const Sequelize = require("sequelize");

const sequelize = new Sequelize("vms", "admin", "Admin@4321", {
  dialect: "mysql",
  host: "localhost", // Replace "localhost" with the actual hostname or IP address of your MySQL server
});

module.exports = sequelize;
