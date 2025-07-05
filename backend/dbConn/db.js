const mongoose = require("mongoose")
require('dotenv').config();

// const URL = "mongodb://localhost:27017/newuser" 
const URL = process.env.MONGO_URI
mongoose.connect(URL),{ 
    useNewUrlParser: true,
  useUnifiedTopology: true,};

const db = mongoose.connection;

db.on( "connected" , ()=> {
    console.log("connection");
})

db.on( "disconnected" , ()=> {
    console.log("disconnection");
})


db.on( "error" , (err)=> {
    console.log("error",err);
})
module.exports = db;