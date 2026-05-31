const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
dotenv.config();

//Import Routes
const authRoutes = require("./routes/authRoutes");
//import middleware
const {bindUserWithRequest}=require('./middleware/authMiddleware')
const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;

//configure store
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

// Middleware
const middleware = [
  morgan("dev"),
  express.json(),
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  session({
    secret: process.env.SESSION_SECRET || "my-secret-key",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 * 7, // 1 day
      httpOnly: true,
    },
  }),
  bindUserWithRequest(),
];

app.use(middleware);

app.use("/api/v1/auth", authRoutes);

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
