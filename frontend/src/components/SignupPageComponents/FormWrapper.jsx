// FormWrapper.js
import React, { useRef, useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Grid } from '@mui/material';
import SocialButtons from '../SocialButtons'; // Ensure this component exists
import { useNavigate } from 'react-router-dom';

const FormWrapper = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const nameRef = useRef();
  const usernameRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Prepare registration data
    const registrationData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      fullname: nameRef.current.value,
      username: usernameRef.current.value,
    };

    // Get CSRF token from cookies
    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];

    try {
      // Send POST request to Django backend for registration
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        navigate('/login'); // Navigate to login page on successful registration

        // Clear input fields after successful registration
        emailRef.current.value = '';
        passwordRef.current.value = '';
        confirmPasswordRef.current.value = '';
        nameRef.current.value = '';
        usernameRef.current.value = '';
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Registration failed! Please check your details.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <Box component="form" display="flex" flexDirection="column" gap={2} width={500} margin="15px auto" padding={3}>
      <Typography variant="h4">Create Account</Typography>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField label="Full Name" inputRef={nameRef} variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Username" inputRef={usernameRef} variant="outlined" fullWidth />
        </Grid>
      </Grid>
      <TextField label="Email address" inputRef={emailRef} variant="outlined" fullWidth />
      <TextField label="Password" type="password" inputRef={passwordRef} variant="outlined" fullWidth />
      <TextField label="Confirm Password" type="password" inputRef={confirmPasswordRef} variant="outlined" fullWidth />
      
      <FormControlLabel
        control={<Checkbox />}
        label={<Typography variant="body2">I’ve read and agree with your <Link href="#">Terms of Services</Link></Typography>}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
        Create Account
      </Button>

      <SocialButtons />
    </Box>
  );
};

export default FormWrapper;