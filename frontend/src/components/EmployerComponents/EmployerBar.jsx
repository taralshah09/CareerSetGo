import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const EmployerBar = () => (
  <Box sx={{ backgroundColor: '#f0f0f0', width: '100%', py: 1}}>
    <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6" color="text.primary">
        Single Employers
      </Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Link href="/" color="inherit" underline="hover">
          Home
        </Link>
        <Link href="/findEmployers" color="inherit" underline="hover">
          Find Employers
        </Link>
        <Link href="/singleEmployers" color="inherit" underline="hover">
        Single Employers
        </Link>
      </Box>
    </Container>
  </Box>
);

export default EmployerBar;
