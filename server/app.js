const express = require("express");
const app = express();
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");

// Initialize database
require("./database");

// Middleware to parse JSON data
app.use(express.json());

// Allow CORS
app.use(cors({ origin: "http://localhost:3000" }));

// Set up routes
app.use("/api/tasks", taskRoutes);

// Start the server
require("dotenv").config();
const PORT = process.env.PORT || 5000;
console.log("process.env.PORT:", process.env.PORT);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
