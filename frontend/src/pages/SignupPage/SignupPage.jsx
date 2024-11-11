import React from 'react';
import { Grid, Box } from '@mui/material';
import Logo from '../../components/Logo';
import FormWrapper from '../../components/SignupPageComponents/FormWrapper';
import SideInfo from '../../components/SideInfo';

const SignupPage = () => {
  return (
    <Grid container style={{ overflow: 'hidden' }}>
      <Grid item xs={12} md={6} style={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 15,
            left: 200,
            zIndex: 10,
          }}
        >
          <Logo />
        </Box>

        <Box
          padding={8}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            height: '100vh',
          }}
        >
          <FormWrapper />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <SideInfo />
      </Grid>
    </Grid>
  );
};

export default SignupPage;
