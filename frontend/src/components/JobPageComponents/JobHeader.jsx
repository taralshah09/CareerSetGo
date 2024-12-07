import React from 'react';
import { Box, Typography, Button, IconButton, Chip, Avatar } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BusinessIcon from '@mui/icons-material/Business';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';

const JobHeader = ({ title, company, type, website, contact, badges, logoUrl }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar
        alt={company}
        src={logoUrl}
        sx={{ width: 60, height: 60 }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ mr: 2 }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {badges && badges.map((badge, index) => (
              <Chip
                key={index}
                label={badge.label}
                sx={{
                  backgroundColor: badge.color || '#BBDEFB',
                  color: badge.textColor || '#1976D2',
                  fontWeight: 'bold',
                }}
                size="small"
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'nowrap' }}>
          <BusinessIcon sx={{ color: '#0A65CC' }} />
          <Typography variant="body2">{company}</Typography>
          <Typography variant="body2" sx={{ mx: 1 }}>·</Typography>
          <LanguageIcon sx={{ color: '#0A65CC' }} />
          <Typography variant="body2">{website}</Typography>
          <Typography variant="body2" sx={{ mx: 1 }}>·</Typography>
          <PhoneIcon sx={{ color: '#0A65CC' }} />
          <Typography variant="body2">{contact}</Typography>
        </Box>
      </Box>
    </Box>

    <Box sx={{ display: 'flex', gap: 2 }}>
      <IconButton>
        <BookmarkBorderIcon />
      </IconButton>
      {/* <Button
        variant="contained"
        sx={{
          backgroundColor: '#0A65CC',
          color: 'white',
          '&:hover': { backgroundColor: '#0A65CC' },
        }}
        endIcon={<ArrowForwardIcon />}
      >
        Apply Now
      </Button> */}
    </Box>
  </Box>
);

export default JobHeader;
