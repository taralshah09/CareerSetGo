import React from 'react';
import { Button, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

const SocialButtons = () => (
  <Stack direction="row" spacing={2} justifyContent="center">
    <Button startIcon={<FacebookIcon />} variant="outlined">
      Sign up with Facebook
    </Button>
    <Button startIcon={<GoogleIcon />} variant="outlined">
      Sign up with Google
    </Button>
  </Stack>
);

export default SocialButtons;
