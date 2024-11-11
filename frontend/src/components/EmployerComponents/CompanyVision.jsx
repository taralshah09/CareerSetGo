import React from 'react';
import { Box, Typography } from '@mui/material';

const CompanyVision = ({ vision }) => (
    <Box sx={{ mt: 4, maxWidth: '100%', wordWrap: 'break-word' }}>
    <Typography variant="h5">Company Vision</Typography>
    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
      {vision}
    </Typography>
  </Box>
);

export default CompanyVision;
