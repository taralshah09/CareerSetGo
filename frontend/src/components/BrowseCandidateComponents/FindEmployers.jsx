import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const FindEmployers = () => (
  <Box sx={{ backgroundColor: '#f0f0f0', width: '100%', py: 2 }}>
    <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6" color="text.primary">
        Find Employers
      </Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Link href="/" color="inherit" underline="hover">
          Home
        </Link>
        <Link href="/findEmployers" color="inherit" underline="hover">
          Find Employers
        </Link>
      </Box>
    </Container>
  </Box>
);

export default FindEmployers;