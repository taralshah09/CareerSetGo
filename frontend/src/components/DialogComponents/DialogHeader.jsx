import React, { useState } from 'react';
import { Box, Avatar, Typography, IconButton, Button } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const Header = ({ image, name, jobTitle, onMail }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = () => {
    setIsSaved((prev) => !prev);
  };

  return (
    <Box display="flex" alignItems="center" padding="16px" borderBottom="1px solid #e0e0e0">
      <Avatar src={image} alt={name} sx={{ width: 56, height: 56, marginRight: 2 }} />
      <Box flex="1">
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="textSecondary">{jobTitle}</Typography>
      </Box>
      <IconButton
        onClick={handleSaveClick}
        sx={{
          backgroundColor: isSaved ? '#E7F0FA' : 'transparent',
          '&:hover': {
            backgroundColor: '#E7F0FA',
          },
          borderRadius: '4px',
        }}
      >
        {isSaved ? <BookmarkIcon sx={{ color: '#0A65CC' }} /> : <BookmarkBorderIcon sx={{ color: '#0A65CC' }} />}
      </IconButton>
      <Button
        variant="contained"
        endIcon={<MailIcon />}
        onClick={onMail}
        sx={{
          backgroundColor: '#0A65CC',
          color: '#fff',
          textTransform: 'none',
          marginLeft: 1,
          '&:hover': {
            backgroundColor: '#084c9a',
          },
        }}
      >
        Email
      </Button>
    </Box>
  );
};

export default Header;
