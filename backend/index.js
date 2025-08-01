const express = require("express");
const app = express();
const db = require('./dbConn/db');
const userRoutes = require('./routes/userRoutes');
const verifySession = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const CORS = require("cors");
const companyRoutes  = require('./routes/comanyRoutes');
require("dotenv").config();
const tenderRoutes = require('./routes/tenderRoutes');
const session = require("express-session");
const applicationRoutes = require('./routes/applicationRoutes');

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://b2b-tender-frontend.vercel.app', // Your Vercel frontend URL
  'https://b2b-tender.vercel.app', // Alternative Vercel URL
  'https://your-actual-vercel-url.vercel.app', // Add your actual Vercel URL here
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(CORS({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || "your-session-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true in production
    maxAge: 1000 * 60 * 60 * 2 // 2 hours
  }
}));

app.use(express.json());

app.get('/homepage', (req,res)=>{
  res.send("homepage")
})

app.get('/is-authenticated', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ authenticated: true, user: req.session.user });
  } else {
    res.json({ authenticated: false });
  }
});

app.get("/protectedroute", verifySession, (req, res) => {
    res.send(`Home Page and Logged In User : ${req.userInfo.email} and ${req.userInfo.username}`)
});

app.use("/company",companyRoutes);
app.use("/user" , userRoutes);
app.use("/tender", verifySession, tenderRoutes);
app.use("/application", verifySession, applicationRoutes);

// Health check endpoint for deployment
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

const PORT = parseInt(process.env.PORT) || 3000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
