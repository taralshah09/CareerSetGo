import React from 'react';
import { Grid, Box, Typography, Link } from '@mui/material';
import Logo from '../../components/Logo.jsx';
import ForgotPasswordForm from '../../components/ForgotPasswordComponents/ForgotPasswordForm.jsx';
import SideInfo from '../../components/SideInfo.jsx';

const LoginPage = () => {
  return (
    <Grid container style={{ overflow: "hidden" }}>
      <Grid item xs={12} md={6} style={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute', 
            top: 15,  
            left: 160,
            zIndex: 10,
          }}
        >
          <Logo />
        </Box>
        
        <Box
          padding={20}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            height: '100vh',
          }}
        >
          <ForgotPasswordForm></ForgotPasswordForm>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <SideInfo />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
