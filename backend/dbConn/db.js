const mongoose = require("mongoose")
require('dotenv').config();

// const URL = "mongodb://localhost:27017/newuser" 
const URL = process.env.MONGODB_URL || mongodb+srv://lakshrajkumar791lrk:lakshrajkumar791@temp-map.im216p8.mongodb.net/?retryWrites=true&w=majority&appName=temp-map

if (!URL) {
    console.error("MongoDB URI is not defined. Please set MONGODB_URI environment variable.");
    process.exit(1);
}

mongoose.connect(URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
