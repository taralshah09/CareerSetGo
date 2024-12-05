import React, { useState } from 'react';
import { Card, CardContent, Typography, Avatar, Box, Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import ProfileDialog from './components/CandidateCardComponents/ProfileDialog';

const JobApplicationCard = ({ candidate }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    name,
    jobTitle,
    location,
    imageUrl,
    biography,
    coverLetter,
    details,
    resumeUrl,
    contactInfo,
    socialMediaLinks,
  } = candidate;

  return (
    <>
      <Card sx={{ margin: 2  , cursor : "pointer", transition: 'transform 0.3s ease-in-out', 
          '&:hover': {
            transform: 'scale(1.02)', 
          },}} onClick={handleClickOpen}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={imageUrl} alt={name} sx={{ width: 56, height: 56, marginRight: 2 }} />
            <Box>
              <Typography variant="h6">{name}</Typography>
              <Typography variant="subtitle1">{jobTitle}</Typography>
            </Box>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2"><strong>Experience:</strong> {details.experience} Years</Typography>
            <Typography variant="body2"><strong>Education:</strong> {details.education}</Typography>
            <Typography variant="body2"><strong>Applied:</strong> {new Date(details.appliedDate).toLocaleDateString()}</Typography>
          </Box>

          {/* Download CV Button */}
          <Box sx={{ marginTop: 2 }}>
            {resumeUrl && (
              <Button 
                variant="text" 
                startIcon={<DownloadIcon/>} 
                href={resumeUrl} 
                target="_blank" 
                download
                sx={{
                  color: '#0A65CC', 
                  textTransform: 'none', 
                  padding: 0,
                }}
              >
                Download CV
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      <ProfileDialog open={open} onClose={handleClose} candidateData={candidate} />
    </>
  );
};

export default JobApplicationCard;