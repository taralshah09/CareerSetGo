import React, { useRef, useState } from 'react';
import { Box, Typography, Button, Checkbox, FormControlLabel, Link, Grid, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FormWrapper = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const nameRef = useRef();
  const usernameRef = useRef();
  const roleRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
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
      role: roleRef.current.value,
    };

    // Get CSRF token from cookies (important for CSRF protection)
    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))?.split('=')[1];

    try {
      setLoading(true); // Set loading to true when submission starts

      // Send POST request to Django backend for registration
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken, // Send CSRF token with the request
        },
        credentials: 'include',  // Include credentials (cookies)
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
        roleRef.current.value = '';
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Registration failed! Please check your details.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false after the submission is complete
    }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked); // Update checkbox state
  };

  return (
    <Box component="form" display="flex" flexDirection="column" width={500} margin="0px auto" padding={3}>
      <Typography variant="h4">Create Account</Typography>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <Grid style={{ display: "flex", gap: "10px", marginBottom: "0" }}>
        <Grid item xs={6}>
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            style={{ width: '100%', padding: '15px 10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </Grid>
        <Grid item xs={6}>
          <input
            ref={usernameRef}
            type="text"
            placeholder="Username"
            style={{ width: '100%', padding: '15px 10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </Grid>
      </Grid>
      <input
        ref={emailRef}
        type="email"
        placeholder="Email address"
        style={{ width: '100%', padding: '15px 10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        ref={passwordRef}
        type="password"
        placeholder="Password"
        style={{ width: '100%', padding: '15px 10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        ref={confirmPasswordRef}
        type="password"
        placeholder="Confirm Password"
        style={{ width: '100%', padding: '15px 10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      {/* Role Select Component */}
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Role</InputLabel>
        <Select
          label="Role"
          inputRef={roleRef}
          defaultValue=""
        >
          <MenuItem value="candidate">Candidate</MenuItem>
          <MenuItem value="recruiter">Recruiter</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
        label={<Typography variant="body2">I’ve read and agree with your <Link href="#">Terms of Services</Link></Typography>}
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !isChecked} // Disable the button if loading or checkbox is not checked
        style={{
          background: "#0A65CC",
          opacity: !isChecked ? "0.5" : "1",
          color: "white",
          padding: "10px 15px",
          borderRadius: "2px",
          fontSize: "15px",
          marginBottom: "10px",
          cursor: !isChecked ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? (
          <CircularProgress size={24} style={{ color: 'white' }} /> // Show loader inside button
        ) : (
          'Create Account'
        )}
      </button>

      <Typography variant="body2" align="center">
        Already have an account?{' '}
        <Link href="/login" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold' }}>
          Login here
        </Link>
      </Typography>
    </Box>
  );
};

export default FormWrapper;
