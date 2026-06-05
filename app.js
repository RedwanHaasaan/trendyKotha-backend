const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
dotenv.config();

//Import Routes
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
//import middleware
const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;


// Middleware
const middleware = [
  morgan("dev"),
  express.json(),
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  cookieParser(),
];

app.use(middleware);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to TrendyKotha API");
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
