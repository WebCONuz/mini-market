const express = require("express");
const config = require("config");
const cookieParser = require("cookie-parser");
const app = express();

// application middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api", require("./routes/index.routes"));

// run app
const PORT = config.get("port") || 5001;
async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
