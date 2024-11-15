import React from 'react';
import { Typography } from '@mui/material';

const Logo = () => (
  <Typography variant="h5" fontWeight="bold" style={{ display: "flex", alignItems: "center" }}>
    <img src="../images/briefcase.png" alt="" style={{ width: "30px", marginRight: "5px" }} />
    CareerSetGo
  </Typography>
);

export default Logo;
