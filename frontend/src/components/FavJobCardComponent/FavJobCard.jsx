import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, Chip, Avatar, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BookmarkIcon from '@mui/icons-material/Bookmark';


const FavJobCard = ({ logo, jobTitle, location, image: imageUrl, jobTiming, salary, deadline }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isExpired = deadline.toLowerCase().includes('expired');

  return (
    <Paper
      elevation={2}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: "100%",
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingY: '0.3rem',
          paddingX: '0.4rem',
          border: 'none ',
          boxShaddow: 'none',
          border: isHovered ? "1px solid #0A65CC" : "1px solid transparent",
          transition: "border 0.3s ease",
        }}
      >
        <Avatar
          src={logo}
          variant="rounded"
          // sx={{ width: 60, height: 60, marginLeft: 2 }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Typography variant="h6" className="jobtitle" fontFamily="Outfit" fontSize="1.2rem">
              {jobTitle}
            </Typography>
            <Chip
              label={jobTiming}
              color="primary"
              size="small"
              sx={{
                fontSize: '12px',
                backgroundColor: '#E7F0FA',
                color: '#0A65CC',
                fontWeight: 700,
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem', gap: '0.75rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
              <LocationOnIcon fontSize="small" sx={{ color: '#5E6670' }} />
              <Typography variant="body2" sx={{ color: '#5E6670' }} fontFamily="Outfit">
                {location}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <AttachMoneyIcon fontSize="small" sx={{ color: '#5E6670' }} />
              <Typography variant="body2" sx={{ color: '#5E6670', marginLeft: '-0.05rem' }} fontFamily="Outfit">
                {salary}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {isExpired ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <CancelOutlinedIcon fontSize="small" sx={{ color: 'red' }} />
                  <Typography variant="body2" sx={{ color: 'red', fontWeight: 400 }} fontFamily="Outfit">
                    Job Expire
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <CalendarTodayIcon fontSize="small" sx={{ color: '#5E6670' }} />
                  <Typography variant="body2" sx={{ color: '#5E6670' }}>
                    {deadline}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </CardContent>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingRight: '1rem' }}>
          <BookmarkIcon></BookmarkIcon>
          {isExpired ? (
            <Button
              variant="contained"
              disabled
              sx={{
                width: '100%',
                backgroundColor: '#9199A3',
                color: '#ffffff',
              }}
            >
              Deadline Expired
            </Button>
          ) : (
            <Button
              variant={isHovered ? 'contained' : 'outlined'}
              endIcon={<ArrowForwardIcon />}
              sx={{
                width: '100%',
                borderColor: '#0A65CC !important',
                color: '#0A65CC !important',
                backgroundColor: '#E7F0FA !important',

                '&:hover': {
                  backgroundColor: '#0A65CC !important',
                  color: '#ffffff !important',
                },
              }}
            >
              Apply Now
            </Button>

          )}
        </Box>
      </Card>
    </Paper>
  );
};

export default FavJobCard;