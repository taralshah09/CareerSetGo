import React from 'react';
import { Card, CardContent, IconButton, Typography, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const DownloadResume = ({ resumeUrl }) => (
  <Card 
    variant="outlined" 
    sx={{ 
      marginBottom: 2, 
      borderColor: '#E7F0FA', 
      borderWidth: 2 
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" sx={{ marginRight: 2 }}>
          Download my resume
        </Typography>
        <IconButton 
          href={resumeUrl} 
          target="_blank" 
          sx={{ 
            backgroundColor: '#0A65CC', 
            color: 'white', 
            width: 40, 
            height: 40, 
            padding: 0, 
            borderRadius: 1,  // Square button
            '&:hover': { backgroundColor: '#084a8c' } 
          }}
        >
          <DownloadIcon />
        </IconButton>
      </Box>
    </CardContent>
  </Card>
);

export default DownloadResume;
