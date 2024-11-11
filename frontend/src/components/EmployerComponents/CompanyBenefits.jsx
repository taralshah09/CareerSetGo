import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const CompanyBenefits = ({ companybenefits }) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Company Benefits</Typography>
      <ul style={{ paddingLeft: '20px' }}>
        {companybenefits.map((item, index) => (
          <li key={index}>
            <Typography variant="body1">{item}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default CompanyBenefits;
