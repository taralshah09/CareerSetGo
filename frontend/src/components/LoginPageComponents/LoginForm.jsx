import React, { useRef, useState } from "react";
import { Typography, Link, CircularProgress, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);  // New state for loading
  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
  const [email, setEmail] = useState("");  // State to track email
  const [password, setPassword] = useState("");  // State to track password
  const navigate = useNavigate();

  // Function to handle login
  async function handleLogin(email, password) {
    setLoading(true);  // Start loader

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
    setLoading(false);  // Stop loader

    if (response.ok) {
      // Store the JWT token in localStorage
      localStorage.setItem("access_token", data.access_token);
      navigate("/");  // You can change this to another route
    } else {
      console.error(data.error);
      setErrorMessage("Invalid credentials. Please try again.");
      return false;
    }
    return true;
  }

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Call login handler
    const loginSuccess = await handleLogin(email, password);
    if (!loginSuccess) {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  // Toggle password visibility
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle email and password change to update state
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Check if both fields are filled for button to be enabled
  const isButtonDisabled = !email || !password || loading;

  return (
    <>
      <Typography variant="h2">WELCOME BACK!</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="John@gmail.com"
            style={{ width: '100%', padding: '15px 10px', marginBottom: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            ref={passwordRef}
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="JGreen@25"
            style={{ width: '100%', padding: '15px 10px', marginBottom: '2px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {/* Checkbox for password visibility */}
          <FormControlLabel
            control={
              <Checkbox
                checked={showPassword}
                onChange={handleToggleShowPassword}
                color="primary"
              />
            }
            label="Show Password"
            style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '8px' }}
          />
        </div>

        <button
          type="submit"
          disabled={isButtonDisabled}  // Disable button if email or password is empty or if loading
          style={{
            background: "#0A65CC",
            opacity: isButtonDisabled ? "0.5" : "1",
            color: "white",
            padding: "10px 15px",
            borderRadius: "2px",
            fontSize: "15px",
            marginBottom: "10px",
            cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? (
            <CircularProgress size={24} style={{ color: "white" }} />
          ) : (
            "Login"
          )}
        </button>
      </form>

      {errorMessage && (
        <Typography color="error" align="center" style={{ marginTop: '1rem' }}>
          {errorMessage}
        </Typography>
      )}

      <Typography variant="body2" align="center" style={{ marginTop: '1rem', width: "100%" }}>
        Don't have an account? <Link href="/signup">Create account</Link>
      </Typography>
    </>
  );
};

export default LoginForm;
