import React, { useState, useEffect } from 'react';
import "./Navbar.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/fetchWithAuth';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showResumeDropdown, setShowResumeDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refresh_token'); // Get refresh token from storage
  
    try {
      const response = await fetch('http://localhost:8000/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Include access token for authentication
        },
        body: JSON.stringify({ refresh_token: refreshToken }), // Send refresh token in the request body
      });
  
      if (response.ok) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user'); // Clear user data
        setIsLoggedIn(false); // Update login state
        navigate('/'); // Redirect to homepage
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData);
      }
    } catch (error) {
      console.error('Error during logout:', error);
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
          <div 
            className="resume-dropdown"
            onMouseEnter={() => setShowResumeDropdown(true)}
            onMouseLeave={() => setShowResumeDropdown(false)}
          >
            <span className="nav-link">Resume</span>
            {showResumeDropdown && (
              <div className="dropdown-content">
                <NavLink to="/resume-builder" className="dropdown-item">Resume Builder</NavLink>
                <NavLink to="/enhance-resume" className="dropdown-item">Enhance Resume</NavLink>
              </div>
            )}
          </div>
          <NavLink to="/choices-game" className="nav-link">Choices game</NavLink>
        </ul>
      </nav>

      <div className="bottom-div">
        <h2>
          <img src="../images/logo.png" alt="logo" />
          CareerSetGo
        </h2>

        <div className="search-box">
          <img src="../images/search.png" alt="search" />
          <input type="text" className='search-bar' placeholder='Job title, keyword, company' />
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