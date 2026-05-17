const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to TrendyKotha API');
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
