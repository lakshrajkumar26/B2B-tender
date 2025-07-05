// Script to update all API URLs in frontend components
// This is a helper script - you can run this manually or I'll update the files directly

const filesToUpdate = [
  'frontend/src/components/Pages/TenderList.jsx',
  'frontend/src/components/Pages/CreateCompany.jsx', 
  'frontend/src/components/Pages/CompanyProfile.jsx',
  'frontend/src/components/Pages/CompanyDetails.jsx',
  'frontend/src/components/Logout/Logout.jsx'
];

// For each file, you need to:
// 1. Add: import API_BASE_URL from '../../config'; (or appropriate path)
// 2. Replace all "http://localhost:3000" with `${API_BASE_URL}` 