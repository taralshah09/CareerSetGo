import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import FollowBtns from '../FollowBtns';

const FollowCard = () => (
  <Card variant="outlined" sx={{ borderColor: '#E7F0FA', borderWidth: 2 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Follow Us On:
        <FollowBtns></FollowBtns>
      </Typography>
    </CardContent>
  </Card>
);

export default FollowCard;
