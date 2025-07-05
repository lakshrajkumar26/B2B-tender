// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://divine-possibility-production.up.railway.app'  // Your Railway URL
  : 'http://localhost:3000';

export default API_BASE_URL; 