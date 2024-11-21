import React, { useRef, useState } from "react";
import { Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Function to handle login
  async function handleLogin(email, password) {
    try {
      // Sending login request to the backend
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token in localStorage
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token); 

        // Fetch user data after successful login
        try {
          const userData = await fetchWithAuth("http://127.0.0.1:8000/api/user/profile/");
          console.log("User data:", userData);  // You can store the user data as needed, like in state
          // Redirect to the profile or home page after successful login
          navigate("/");  // You can change this to another route
        } catch (error) {
          setErrorMessage("Failed to fetch user data.");
        }
      } else {
        setErrorMessage(data.error || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
      console.error(error);
    }
  }

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Call login handler
    await handleLogin(email, password);
  };

  return (
    <>
      <Typography variant="h2">WELCOME BACK!</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Email"
          type="email"
          name="email"
          required
          placeholder="John@gmail.com"
          inputRef={emailRef}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          required
          placeholder="JGreen@25"
          inputRef={passwordRef}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth style={{ color: "white", background: "#0A65CC" }}>
          Login
        </Button>
      </form>

      {errorMessage && (
        <Typography color="error" align="center" style={{ marginTop: '1rem' }}>
          {errorMessage}
        </Typography>
      )}

      <Typography variant="body2" align="center" style={{ marginTop: '1rem', width: "100%" }}>
        or
      </Typography>

      <div style={{ textAlign: 'center', marginTop: 16, width: "100%" }}>
        <Button style={{ width: "100%" }} variant="outlined" startIcon={<img src="../images/google.png" alt="Google Icon" style={{ width: 20 }} />}>
          Continue with Google
        </Button>
      </div>

      <Typography variant="body2" align="center" style={{ marginTop: '1rem', width: "100%" }}>
        Don't have an account? <Link href="/signup">Create account</Link>
      </Typography>
    </>
  );
};

export default LoginForm;
