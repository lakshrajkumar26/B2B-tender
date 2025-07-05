import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CompanyDetails.css';
import API_BASE_URL from '../../configFolder/api.js';

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/company/${id}`);
        setCompany(res.data);
      } catch (err) {
        console.error('Failed to fetch company:', err);
      }
    };

    fetchCompany();
  }, [id]);

  if (!company) return <div className="loader">Loading company details...</div>;

  return (
    <div className="company-detail-container">
      <div className="company-header">
        <img
          className="company-detail-logo"
          src={company.logo || 'https://via.placeholder.com/100'}
          alt={company.name}
        />
        <h2 className="company-name">{company.name}</h2>
      </div>

      <div className="company-info">
        <p><strong>Industry:</strong> {company.industry}</p>
        <p><strong>Services:</strong> {company.services}</p>
        <p><strong>Description:</strong> {company.description}</p>
      </div>
    </div>
  );
};

export default CompanyDetails;
