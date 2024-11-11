import React from 'react';
import { Box, Typography } from '@mui/material';

const JobDescription = ({ description }) => (
    <Box sx={{ mt: 4, maxWidth: '100%', wordWrap: 'break-word' }}>
    <Typography variant="h5">Description</Typography>
    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
      {description}
    </Typography>
  </Box>
);

export default JobDescription;
