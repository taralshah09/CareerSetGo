import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProfileDialog from '../CandidateCardComponents/ProfileDialog';

const CandidateCard = ({ name, jobTitle, location, experience, imageUrl, biography, coverLetter, details, resumeUrl, contactInfo, socialMediaLinks }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleBookmarkToggle = () => {
    setBookmarked((prev) => !prev);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const candidateData = {
    name,
    jobTitle,
    location,
    experience,
    image: imageUrl,
    biography,
    coverLetter,
    details,
    resumeUrl,
    contactInfo,
    socialMediaLinks,
  };

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
        paddingY: '0.5rem',
        paddingX: '0.4rem',
        border: '1px solid #E4E5E8',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        '&:hover': {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
          borderColor: '#0A65CC',
          '& .name': {
            color: '#0A65CC',
          },
          '& .icon-button': {
            backgroundColor: '#E7F0FA',
            borderRadius: '4px',
          },
        },
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          margin: '1rem',
          borderRadius: '8px',
          backgroundColor: '#767F8C',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" className="name">
          {name}
        </Typography>
        <Typography color="textSecondary">{jobTitle}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
          <LocationOnIcon fontSize="small" sx={{ color: '#5E6670' }} />
          <Typography variant="body2" sx={{ color: '#5E6670', marginRight: '1rem' }}>
            {location}
          </Typography>
          <AttachMoneyIcon fontSize="small" sx={{ color: '#5E6670' }} />
          <Typography variant="body2" sx={{ color: '#5E6670' }}>
            {details.experience} years experience
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingRight: '1rem' }}>
        <IconButton onClick={handleBookmarkToggle} className="icon-button">
          {bookmarked ? <BookmarkIcon sx={{ color: 'black' }} /> : <BookmarkBorderIcon sx={{ color: 'inherit' }} />}
        </IconButton>
        <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} onClick={handleDialogOpen} backgroundColor="#0A65CC">
          View Profile
        </Button>
      </Box>

      {/* Profile Dialog */}
      <ProfileDialog open={openDialog} onClose={handleDialogClose} candidateData={candidateData} />
    </Card>
  );
};

export default CandidateCard;
