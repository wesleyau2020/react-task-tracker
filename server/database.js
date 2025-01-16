const { Sequelize } = require("sequelize");

// Create a new Sequelize instance for SQLite
// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "./database/tasks.db",
// });

// Create a new Sequelize instance for MySQL
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USERNAME = process.env.DB_USERNAME || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";

const sequelize = new Sequelize("tasks-tracker", DB_USERNAME, DB_PASSWORD, {
  dialect: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  dialectOptions: {
    //
  },
  logging: console.log,
});

(async () => {
  try {
    // Authenticate the connection
    await sequelize.authenticate();
    // console.log("Connected to SQLite database successfully.");
    console.log("Connected to MySQL database successfully.");

    // Synchronize the models
    await sequelize.sync({ force: false });
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
