import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  Paper,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmailIcon from '@mui/icons-material/Email';
import DownloadIcon from '@mui/icons-material/Download';

const SaveCard = ({ candidateName, specialization, imageLink }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  return (
    <Paper
      elevation={2}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: '100%',
        borderRadius: 2,
        backgroundColor: '#fff',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          height: '80px',
          alignItems: 'center',
          paddingY: '0.1rem',
          paddingX: '0.1rem',
          border: isHovered ? '1px solid #0A65CC' : '1px solid transparent',
          transition: 'border 0.3s ease',
        }}
      >
        <Avatar
          src={imageLink}
          variant="rounded"
          sx={{ width: 50, height: 50, marginLeft: 2 }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontFamily="Outfit" fontSize="1rem">
            {candidateName}
          </Typography>
          <Typography variant="body2" sx={{ color: '#5E6670', marginTop: '0.1rem' }} fontFamily="Outfit">
            {specialization}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingRight: '1rem' }}>
        <Box
            sx={{
            height: '34px',
            width: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px', // Optional: Makes the edges rounded
            transition: 'background-color 0.3s ease', // Smooth transition effect
            backgroundColor: isHovered ? '#E7F0FA' : 'transparent', // Light blue on hover
            '&:hover': {
                backgroundColor: '#E7F0FA',
            },
            }}
        >
            <BookmarkIcon sx={{ color: '#0A65CC',fontSize:'1.4rem' }} />
        </Box>

        <Button
            variant={isHovered ? 'contained' : 'outlined'}
            endIcon={<ArrowForwardIcon />}
            sx={{
            borderColor: '#0A65CC',
            height: '34px',
            color: '#0A65CC !important',
            backgroundColor: isHovered ? '#0A65CC' : '#E7F0FA !important',
            '&:hover': {
                backgroundColor: '#0A65CC !important',
                color: '#ffffff !important',
            },
            }}
        >
            View Profile
        </Button>
         <IconButton
        onClick={handlePopoverOpen}
        sx={{
            backgroundColor: 'transparent !important', // No background initially
            border: 'none !important', // No border initially
            transition: 'background-color 0.3s ease', // Smooth transition
            '&:hover': {
            backgroundColor: '#f0f0f0', // Light gray on hover
            },
        }}
        >
        <MoreVertIcon />
        </IconButton>

        </Box>

      </Card>

      {/* Popover */}
      <Popover
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Send Email" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DownloadIcon />
            </ListItemIcon>
            <ListItemText primary="Download CV" />
          </ListItem>
        </List>
      </Popover>
    </Paper>
  );
};

export default SaveCard;
