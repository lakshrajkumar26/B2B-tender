
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import './CompanyProfile.css';
import { Link } from 'react-router-dom';

const CompanyProfile = () => {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const res = await axios.get('http://localhost:3000/company/companies', {
  withCredentials: true
  });
                setCompanies(res.data);
            } catch (err) {
                console.error('Failed to fetch companies', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompany();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    return (
        <div className="company-column-container">

  <div className="company-header">
    <h2 className="column-heading">📋 Company Listing</h2>
    <Link to="/company/register">
      <button className="register-company-btn">+ Register New Company</button>
    </Link>
  </div>

  <div className="company-list">
    {/* map companies here */}
  </div>

            <div className="company-list">
                {companies.map((company) => (
                    <Link
                        to={`/company/${company._id}`}
                        key={company._id}
                        className="company-row-link"
                    >
                        <div className="company-row">
                            <img
                                className="logo-small"
                                src={company.logo || 'https://via.placeholder.com/60'}
                                alt={company.name}
                            />
                            <div className="company-details">
                                <h3>{company.name}</h3>
                                <p><strong>Industry:</strong> {company.industry}</p>
                                <p><strong>Services:</strong> {company.services}</p>
                                <p><strong>Description:</strong> {company.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        </div>
    );
};

export default CompanyProfile;
