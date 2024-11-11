import React from 'react';
import { AppBar, Toolbar, IconButton, Box, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from './Logo.jsx';
import CountryDropdown from './CountryDropDown.jsx';

const Navbar = () => (
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
        sx={{ width: '500px', }}
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ color: 'gray'}} />
          ),
        }}
      />

      {/* Right Section: Bell Icon and Account Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;