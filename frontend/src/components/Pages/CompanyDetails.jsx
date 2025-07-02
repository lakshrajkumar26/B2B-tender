import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CompanyProfile.css';

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/company/${id}`);
        setCompany(res.data);
      } catch (err) {
        console.error('Failed to fetch company:', err);
      }
    };

    fetchCompany();
  }, [id]);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="company-column-container">
      <h2>{company.name}</h2>
      <img
        className="logo-small"
        src={company.logo || 'https://via.placeholder.com/100'}
        alt={company.name}
      />
      <p><strong>Industry:</strong> {company.industry}</p>
      <p><strong>Services:</strong> {company.services}</p>
      <p><strong>Description:</strong> {company.description}</p>
      
    </div>
  );
};

export default CompanyDetails;
