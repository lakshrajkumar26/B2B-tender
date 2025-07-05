import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CompanyProfile.css';
import { Link } from 'react-router-dom';

const CompanyProfile = () => {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState({ name: '', industry: '', services: '' });
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        setIsLoading(true);
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

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearching(true);
        try {
            const params = new URLSearchParams();
            if (search.name) params.append('name', search.name);
            if (search.industry) params.append('industry', search.industry);
            if (search.services) params.append('services', search.services);
            const res = await axios.get(`http://localhost:3000/company/search?${params.toString()}`, {
                withCredentials: true
            });
            setCompanies(res.data);
        } catch (err) {
            console.error('Search failed', err);
        } finally {
            setSearching(false);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    return (
        <div className="company-column-container">
            <div className="company-header">
                <h2 className="column-heading">📋 Company Listing</h2>
                <Link to="/company/register">
                    <button className="register-company-btn">+ Register New Company</button>
                </Link>
            </div>
            <form className="company-search-form" onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={search.name}
                    onChange={e => setSearch({ ...search, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Search by industry"
                    value={search.industry}
                    onChange={e => setSearch({ ...search, industry: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Search by services"
                    value={search.services}
                    onChange={e => setSearch({ ...search, services: e.target.value })}
                />
                <button type="submit" disabled={searching}>Search</button>
                <button type="button" onClick={fetchCompanies} disabled={searching} style={{ marginLeft: '0.5rem' }}>Reset</button>
            </form>
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
