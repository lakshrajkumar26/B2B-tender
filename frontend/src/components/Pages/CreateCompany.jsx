import React, { useState } from 'react';
import axios from 'axios';
import './CreateCompany.css';
import API_BASE_URL from '../../config';

const CreateCompany = () => {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    industry: 'IT',
    description: '',
    services: '',
    logo: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const industries = ['IT', 'Retail', 'Finance'];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData({ ...formData, logo: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const res = await axios.post(`${API_BASE_URL}/company/register`, data);
      setMessage(res.data.message);
      setFormData({
        userId: '',
        name: '',
        industry: 'IT',
        description: '',
        services: '',
        logo: null,
      });
      setPreview(null);
    } catch (err) {
      console.error('Company creation failed:', err);
      setMessage('Failed to create company.');
    }
  };

  return (
    <div className="create-company-container">
      <h2>Create New Company</h2>
      {message && <p className="form-message">{message}</p>}
      <form onSubmit={handleSubmit} className="company-form">
        <label>User ID:</label>
        <input type="text" name="userId" value={formData.userId} onChange={handleChange} required />

        <label>Company Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Industry:</label>
        <select name="industry" value={formData.industry} onChange={handleChange}>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />

        <label>Services:</label>
        <input type="text" name="services" value={formData.services} onChange={handleChange} />

        <label>Company Logo:</label>
        <input type="file" name="logo" accept="image/*" onChange={handleChange} />
        {preview && <img src={preview} alt="Preview" className="logo-preview" />}

        <button type="submit">Register Company</button>
      </form>
    </div>
  );
};

export default CreateCompany;
