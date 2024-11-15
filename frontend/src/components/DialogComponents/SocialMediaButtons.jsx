import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const SocialMediaButtons = ({ links }) => (
  <Box display="flex" flexDirection="column" sx={{ marginTop: 2 }}>
    {/* Text above icons */}
    <Typography variant="body2" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
      Follow Me on Social Media
    </Typography>

    {/* Icon Buttons */}
    <Box display="flex"  sx={{ width: '100%' ,  }}>
      <IconButton
        href={links.facebook}
        sx={{
          backgroundColor: '#E7F0FA',
          color: '#0A65CC',
          marginRight : '1rem',
          borderRadius: '8px',
          padding: '12px',
          '&:hover': {
            backgroundColor: '#D6E8FB',
          },
        }}
      >
        <Facebook />
      </IconButton>
      <IconButton
        href={links.twitter}
        sx={{
          backgroundColor: '#E7F0FA',
          color: '#0A65CC',
          marginRight : '1rem',
          borderRadius: '8px',
          padding: '12px',
          '&:hover': {
            backgroundColor: '#D6E8FB', // Slightly darker on hover
          },
        }}
      >
        <Twitter />
      </IconButton>
      <IconButton
        href={links.linkedin}
        sx={{
          backgroundColor: '#E7F0FA',
          color: '#0A65CC',
          marginRight : '1rem',
          borderRadius: '8px',
          padding: '12px',
          '&:hover': {
            backgroundColor: '#D6E8FB', // Slightly darker on hover
          },
        }}
      >
        <LinkedIn />
      </IconButton>
      <IconButton
        href={links.instagram}
        sx={{
          backgroundColor: '#E7F0FA',
          color: '#0A65CC',
          marginRight : '1rem',
          borderRadius: '8px',
          padding: '12px',
          '&:hover': {
            backgroundColor: '#D6E8FB', // Slightly darker on hover
          },
        }}
      >
        <Instagram />
      </IconButton>
    </Box>
  </Box>
);

export default SocialMediaButtons;
