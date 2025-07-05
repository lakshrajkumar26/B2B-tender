const verifySession = (req, res, next) => {
  if (req.session && req.session.user) {
    req.userInfo = req.session.user;
    next();
  } else {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }
};

module.exports = verifySession;

//new with bearer


// const jwt = require("jsonwebtoken");

// const verifyJwt = (req, res, next) => {
//   try {
//     const token =
//       req.cookies.token ||
//       (req.headers.authorization && req.headers.authorization.split(" ")[1]);

//     if (!token) return res.status(401).json({ err: "Access denied. No token provided" });

//     const decoded = jwt.verify(token, "secretkey");
//     req.userInfo = decoded;
//     console.log(req.userInfo.email);
//     next();
//   } catch (err) {
//     return res.status(400).json({ err: "invalid jwt or expires" });
//   }
// };

// module.exports = verifyJwt;

//both 

// const jwt = require("jsonwebtoken");

// const verifyJwt = (req, res, next) => {
//   try {
//     // Get token from either cookie or Authorization header
//     const token =
//       req.cookies?.token || 
//       (req.headers.authorization && req.headers.authorization.split(" ")[1]);

//     if (!token) {
//       return res.status(401).json({ error: "Access denied. No token provided" });
//     }

//     // Use .env for secret key (NEVER hardcode secrets)
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach decoded user info to request
//     req.user = decoded;

//     // Optional debug log
//     // console.log("Authenticated User:", req.user.email || req.user.id);

//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// };

// module.exports = verifyJwt;

