// middlewares/multer.js
const multer = require("multer");

const storage = multer.memoryStorage(); // you’re using Cloudinary
const upload = multer({ storage });

module.exports = upload;
