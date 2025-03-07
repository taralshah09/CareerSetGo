import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, TextField, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from './Logo.jsx';
import CountryDropdown from './CountryDropDown.jsx';
import LoginModal from './LoginModal.jsx';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control modal visibility

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update login status
    setShowLoginModal(false); // Close the modal
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Update login status
    // Add logout logic here (e.g., clear tokens from localStorage)
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ padding: '0 !important', margin: '0' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 !important', width: '100%' }}>

        {/* Left Section: Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Logo />
        </Box>

        {/* Search Bar */}
        <TextField
          variant="outlined"
          label="Job title, keyword, company"
          sx={{ width: '500px' }}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ color: 'gray' }} />
            ),
          }}
        />

        {/* Right Section: Bell Icon, Account Icon, and Login/Logout Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>

          {isLoggedIn ? (
            <>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <Button variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={() => setShowLoginModal(true)}>
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </AppBar>
  );
};

export default Navbar;