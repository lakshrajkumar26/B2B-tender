const mongoose = require("mongoose")
require('dotenv').config();

// const URL = "mongodb://localhost:27017/newuser" 
<<<<<<< HEAD
const URL = process.env.MONGO_URI || process.env.MONGODB_URI
=======
const URL = process.env.MONGODB_URL
>>>>>>> 0ec4ffe4a5e36e00e3e267895357d501b762801b

if (!URL) {
    console.error("MongoDB URI is not defined. Please set MONGODB_URI environment variable.");
    process.exit(1);
}

mongoose.connect(URL, { 
<<<<<<< HEAD
    useNewUrlParser: true,
    useUnifiedTopology: true,
=======
   useUnifiedTopology: true,
>>>>>>> 0ec4ffe4a5e36e00e3e267895357d501b762801b
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
