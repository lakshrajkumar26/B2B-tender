const express = require('express');
const routes = express.Router();
const user = require('../models/user');
const bcrypt = require('bcrypt');
const transporter = require('../config/nodemailer');

routes.get("/route/page", (req, res) => {
    res.send("welcome to new page");
})


/* without bcrypt

router.post('/register' , async (req,res) => {
  const data = req.body;
    try{
      const response = await user.create({
        username : data.username,
        email :data.email,
        password : data.password,
      })
      res.send(response);
    }
    catch (err){
        console.log(err);
    }
})  
with bcrypt 
*/


routes.post("/register", async (req, res) => {
    const data = req.body;
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPass = await bcrypt.hash(data.password, salt);
        const newUser = await user.create({
            username: data.username,
            email: data.email,
            password: hashedPass
        })
        // Optionally, auto-login after registration:
        // req.session.user = { id: newUser._id, email: newUser.email, username: newUser.username };
        res.status(200).json({ user: newUser, success: true });
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

routes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const searchedUser = await user.findOne({ email: email })
        if (!searchedUser) return res.status(401).json({ message: "invalid email or password" });

        const isMatch = await bcrypt.compare(password, searchedUser.password)
        if (!isMatch) return res.status(401).json({ message: "wrong password" });

        // Store user info in session
        req.session.user = {
            id: searchedUser._id,
            email: searchedUser.email,
            username: searchedUser.username
        };
        res.status(200).json({ message: "successfully logged in", user: searchedUser });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Login failed" });
    }
})

routes.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ err: "Logout Failed" });
        }
        res.clearCookie('connect.sid'); // default session cookie name
        res.status(200).json({ msg: "Logged out successfully and session destroyed" });
    });
})



module.exports = routes