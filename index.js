const express = require("express");
const config = require("config");
const cookieParser = require("cookie-parser");
const sequelize = require("./config/db");
const app = express();

// application middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api", require("./routes/index.routes"));

// Catch-all for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Oops, something went wrong.",
    error: err.message,
  });
});

// run app
const PORT = config.get("port") || 5001;
const DB_NAME = config.get("db_name");
async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Connect to Database: ${DB_NAME}`);
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
