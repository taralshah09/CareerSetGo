import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const JobDetails = () => (
  <Box sx={{ backgroundColor: '#f0f0f0', width: '100%', py: 2 }}>
    <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6" color="text.primary">
        Job Details
      </Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Link href="/" color="inherit" underline="hover">
          Home
        </Link>
        <Link href="/find-job" color="inherit" underline="hover">
          Find Job
        </Link>
        <Link href="/job-details" color="inherit" underline="hover">
          Job Details
        </Link>
      </Box>
    </Container>
  </Box>
);

export default JobDetails;
