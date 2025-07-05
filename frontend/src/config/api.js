const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/user/login`,
  REGISTER: `${API_BASE_URL}/user/register`,
  LOGOUT: `${API_BASE_URL}/user/logout`,
  IS_AUTHENTICATED: `${API_BASE_URL}/is-authenticated`,
  
  // Company endpoints
  COMPANIES: `${API_BASE_URL}/company/companies`,
  COMPANY_SEARCH: `${API_BASE_URL}/company/search`,
  COMPANY_REGISTER: `${API_BASE_URL}/company/register`,
  COMPANY_BY_ID: (id) => `${API_BASE_URL}/company/${id}`,
  
  // Tender endpoints
  TENDERS: `${API_BASE_URL}/tender`,
  TENDER_BY_ID: (id) => `${API_BASE_URL}/tender/${id}`,
  TENDERS_BY_COMPANY: (companyId) => `${API_BASE_URL}/tender/company/${companyId}`,
  
  // Application endpoints
  SUBMIT_APPLICATION: `${API_BASE_URL}/application/submit`,
  APPLICATIONS_BY_TENDER: (tenderId) => `${API_BASE_URL}/application/tender/${tenderId}`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/health`
};

export default API_ENDPOINTS; 