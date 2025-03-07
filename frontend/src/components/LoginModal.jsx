// src/components/LoginModal.jsx
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const LoginModal = ({ onClose, onSuccess }) => {
  const handleSuccess = async (response) => {
    console.log('Google Login Response:', response);
    try {
      // Handle ID token (credential) flow
      if (response.credential) {
        // Send the ID token to your backend
        const res = await axios.post('http://127.0.0.1:8000api/auth/google/callback/', {
          id_token: response.credential,
        });

        // Store tokens
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        // Call the success callback with user data
        onSuccess(res.data.user);
        onClose(); // Close the modal after successful login
        return;
      }

      throw new Error('Invalid response from Google');
    } catch (error) {
      console.error('Login Error:', error);
      onClose(); // Close the modal on error
    }
  };

  const handleError = (error) => {
    console.error('Google Login Failed:', error);
    onClose(); // Close the modal on error
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Sign In</h2>
        <p>Please sign in to continue.</p>
        <GoogleOAuthProvider clientId="13679971103-8pmsi7ec03vssg6qlqd82fji6t2u57mt.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap={false}
            cookiePolicy={'single_host_origin'}
          />
        </GoogleOAuthProvider>
        <button onClick={onClose} style={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#0465CC',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default LoginModal;