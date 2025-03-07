// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import Logo from '../../components/Logo'; // Replace with your logo component

const LoginPage = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleSuccess = async (response) => {
    console.log('Google Login Response:', response);
    setLoading(true);
    setError(null);

    try {
      // Handle ID token (credential) flow
      if (response.credential) {
        // Send the ID token to your backend
        const res = await axios.post('http://127.0.0.1:8000/api/auth/google/callback/', {
          id_token: response.credential,
        });

        // Store tokens
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        // Call the success callback with user data
        if (typeof loginUser === 'function') {
          loginUser(res.data.user);
          navigate('/'); // Redirect to the homepage or dashboard
        } else {
          console.error('loginUser is not available in context');
        }
        return;
      }

      throw new Error('Invalid response from Google');
    } catch (error) {
      console.error('Login Error:', error);
      setError('Failed to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    console.error('Google Login Failed:', error);
    setError('Google login failed. Please try again.');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <Logo sx={{ width: '100px', height: 'auto', marginBottom: '20px' }} />

        {/* Welcome Message */}
        <Typography variant="h5" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
          Welcome to CareerSetGo
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '30px', color: 'text.secondary' }}>
          Sign in to continue
        </Typography>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ marginBottom: '20px' }}>
            {error}
          </Alert>
        )}

        {/* Google Login Button */}
        <GoogleOAuthProvider clientId="13679971103-8pmsi7ec03vssg6qlqd82fji6t2u57mt.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap={false}
            cookiePolicy={'single_host_origin'}
            theme="filled_blue"
            size="large"
            width="100%"
          />
        </GoogleOAuthProvider>

        {/* Loading Spinner */}
        {loading && (
          <Box sx={{ marginTop: '20px' }}>
            <CircularProgress />
          </Box>
        )}

        {/* Additional Options */}
        <Typography variant="body2" sx={{ marginTop: '20px', color: 'text.secondary' }}>
          By signing in, you agree to our{' '}
          <a href="/privacy-policy" style={{ color: '#0465CC', textDecoration: 'none' }}>
            Privacy Policy
          </a>
          .
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;