import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginComponent = ({ onSuccess, onError }) => {
  const handleSuccess = async (response) => {
    console.log('Google Login Response:', response);
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
        onSuccess(res.data.user);
        return;
      }
      
      throw new Error('Invalid response from Google');
    } catch (error) {
      console.error('Login Error:', error);
      onError(error);
    }
  };

  const handleError = (error) => {
    console.error('Google Login Failed:', error);
    onError(error);
  };

  return (
    <GoogleOAuthProvider clientId="13679971103-8pmsi7ec03vssg6qlqd82fji6t2u57mt.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}
        cookiePolicy={'single_host_origin'}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;