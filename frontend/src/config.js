// API Configuration
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://divine-possibility-production.up.railway.app'  // Your Railway URL
  : 'http://localhost:3000';

export default API_BASE_URL; 