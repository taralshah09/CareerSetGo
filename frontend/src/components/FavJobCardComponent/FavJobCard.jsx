import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const FavJobCard = ({ jobTitle, location, image: imageUrl, jobTiming, salary, deadline }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isExpired = deadline.toLowerCase().includes('expired');

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        paddingY: '0.3rem',
        paddingX: '0.4rem',
        border: 'none ', 
        boxShaddow:'none',
        '&:hover': {
         
          border: '1px solid #0A65CC', 
        },
      }}
    >
      <Box
        sx={{
          width: 50,
          height: 50,
          margin: '1rem',
          borderRadius: '8px',
          backgroundColor: '#767F8C',
          backgroundImage: `url(imgurl)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Typography variant="h6" className="jobtitle">
            {jobTitle}
          </Typography>
          <Chip
            label={jobTiming}
            color="primary"
            size="small"
            sx={{
              fontSize: '0.75rem',
              backgroundColor: '#E7F0FA',
              color: '#0A65CC',
              fontWeight: 600,
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem', gap: '0.75rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
            <LocationOnIcon fontSize="small" sx={{ color: '#5E6670' }} />
            <Typography variant="body2" sx={{ color: '#5E6670' }}>
              {location}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <AttachMoneyIcon fontSize="small" sx={{ color: '#5E6670' }} />
            <Typography variant="body2" sx={{ color: '#5E6670', marginLeft: '-0.05rem' }}>
              {salary}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {isExpired ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CancelOutlinedIcon fontSize="small" sx={{ color: 'red' }} />
                <Typography variant="body2" sx={{ color: 'red', fontWeight: 400 }}>
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
              backgroundColor: isHovered ? '#0A65CC' : '#E7F0FA',
              color: isHovered ? '#ffffff' : '#0A65CC',
              borderColor: '#0A65CC',
              '&:hover': {
                backgroundColor: '#0A65CC',
                color: '#ffffff',
              },
            }}
          >
            Apply Now
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default FavJobCard;
