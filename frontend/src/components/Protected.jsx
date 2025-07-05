import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const ProtectedPage = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/protectedroute`, {
          withCredentials: true, 
        });

        setMessage(res.data); // 
      } catch (err) {
        console.error(err);
        setError('Unauthorized or error occurred');
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Protected Route Test</h1>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ProtectedPage;
