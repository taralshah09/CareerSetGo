import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const RelatedJobCard = ({ job }) => (
  <Card variant="outlined" sx={{ borderColor: '#E7F0FA', borderWidth: 2 , width :" 100%"}}>
    <CardContent>

    <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: '10px',
              overflow: 'hidden',
              mr: 2,
            }}
          >
            <img
              src={job.logoUrl}
              alt={`logo`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>

      <Box sx={{ display: 'flex' , flexDirection : "column"}}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {job.company}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon sx={{ color: 'text.secondary', fontSize: "20px" }} />
          <Typography variant="body2" color="text.secondary">
            {job.location}
          </Typography>
        </Box>
      </Box>
      </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          {job.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.type} · {job.salary}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default RelatedJobCard;
