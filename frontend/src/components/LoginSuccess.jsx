// src/components/LoginSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const LoginSuccess = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const access = params.get('access');
    const refresh = params.get('refresh');

    if (access && refresh) {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      fetch('http://127.0.0.1:8000/api/user/profile/', {
        headers: { 'Authorization': `Bearer ${access}` },
      })
        .then(res => res.json())
        .then(user => {
          localStorage.setItem('user', JSON.stringify(user));
          loginUser(user);
          navigate('/'); // Redirect to home
        })
        .catch(err => console.error('Error fetching user:', err));
    } else {
      console.error('No tokens received in redirect');
      navigate('/login');
    }
  }, [loginUser, navigate, location.search]);

  return <div>Loading...</div>;
};

export default LoginSuccess;