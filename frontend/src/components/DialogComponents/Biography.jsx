import React from 'react';
import { Typography } from '@mui/material';

const Biography = ({ text }) => (
  <div style={{ marginBottom: '16px' }}>
    <Typography variant="h6">Biography</Typography>
    <Typography variant="body2" color="textSecondary">{text}</Typography>
  </div>
);

export default Biography;
