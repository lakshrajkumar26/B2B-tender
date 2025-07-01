import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedPage = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/protectedroute', {
          withCredentials: true, // 🔥 Required to send cookies
        });

        setMessage(res.data); // ✅ Should return email + username
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
