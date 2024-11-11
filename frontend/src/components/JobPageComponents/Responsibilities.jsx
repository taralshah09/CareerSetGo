import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Responsibilities = ({ responsibilities }) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Responsibilities</Typography>
      <ul style={{ paddingLeft: '20px' }}>
        {responsibilities.map((item, index) => (
          <li key={index}>
            <Typography variant="body1">{item}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Responsibilities;
