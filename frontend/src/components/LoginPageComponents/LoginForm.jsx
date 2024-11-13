import React, { useRef } from "react";
import { Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";  // Import Cookies for cookie handling

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        
        Cookies.set('username', data.username, { expires: 1 }); // 1 day expiration

        navigate('/user-dashboard');
        
        emailRef.current.value = '';
        passwordRef.current.value = '';
      } else {
        const data = await response.json();
        alert(data.error || 'Login failed! Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Typography variant="h2">WELCOME BACK!</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Email"
          type="email"
          required
          placeholder="John@gmail.com"
          inputRef={emailRef}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          required
          placeholder="JGreen@25"
          inputRef={passwordRef}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>or</Typography>
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Button variant="outlined" startIcon={<img src="./google.png" alt="Google Icon" style={{ width: 20 }} />}>
          Continue with Google
        </Button>
      </div>
      <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
        Don't have an account? <Link href="/signup">Create account</Link>
      </Typography>
    </>
  );
};

export default LoginForm;
