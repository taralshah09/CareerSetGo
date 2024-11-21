import React, { useState, useEffect } from 'react';
import "./Navbar.css";
import { NavLink, useNavigate } from 'react-router-dom';  // Import useNavigate here
import { fetchWithAuth } from '../../utils/fetchWithAuth';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  useEffect(() => {
    // Check if access token exists in localStorage
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token); // Set login status based on token presence
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        console.error('No refresh token found');
        return;
      }
  
      const response = await fetchWithAuth('http://localhost:8000/logout/', {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refreshToken }), 
        headers: {
          'Content-Type': 'application/json', 
        },
      });
  
      console.log('Raw Response:', response); // Log the response to verify
  
      if (response && response.message === "Logged out successfully!") {
        console.log('Clearing tokens...');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.error('Logout failed:', response.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  

  return (
    <div className='header-div'>
      <nav className='top-div'>
        <ul type="none">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/find-job" className="nav-link">Find Job</NavLink>
          <NavLink to="/employers" className="nav-link">Employers</NavLink>
          <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          <NavLink to="/resume-builder" className="nav-link">Resume builder</NavLink>
          <NavLink to="/customer-support" className="nav-link">Customer Support</NavLink>
        </ul>
      </nav>

      <div className="bottom-div">
        <h2>
          <img src="../images/logo.png" alt="logo" />
          CareerSetGo
        </h2>

        <div className="search-box">
          <img src="../images/search.png" alt="search" />
          <input type="text" placeholder='Job title, keyword, company' />
        </div>

        <div className="buttons-box">
          {!isLoggedIn ? (
            <>
              <NavLink to="/login">
                <button>Sign In</button>
              </NavLink>
              <button>Post A Job</button>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
