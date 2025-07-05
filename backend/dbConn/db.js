const mongoose = require("mongoose")
require('dotenv').config();

// const URL = "mongodb://localhost:27017/newuser" 
const URL = process.env.MONGO_URL || process.env.MONGO_URL || process.env.MONGO_URL

if (!URL) {
    console.error("MongoDB URI is not defined. Please set MONGODB_URI environment variable.");
    process.exit(1);
}

mongoose.connect(URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate: false,
    retryWrites: true,
    w: 'majority'
});

const db = mongoose.connection;

db.on("connected", () => {
    console.log("MongoDB connected successfully");
})

db.on("disconnected", () => {
    console.log("MongoDB disconnected");
})

db.on("error", (err) => {
    console.log("MongoDB connection error:", err);
})

module.exports = db;
