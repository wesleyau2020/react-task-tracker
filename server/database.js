const { Sequelize } = require("sequelize");

// Create a new Sequelize instance for SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/tasks.db",
});

(async () => {
  try {
    // Authenticate the connection
    await sequelize.authenticate();
    console.log("Connected to SQLite database successfully.");

    // Synchronize the models
    await sequelize.sync({ force: false });
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
