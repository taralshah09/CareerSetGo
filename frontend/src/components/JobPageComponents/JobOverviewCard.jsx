import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

const JobOverviewCard = ({ overview }) => (
  <Card variant="outlined" sx={{ borderColor: '#E7F0FA', borderWidth: 2 }}>
    <CardContent>
      <Typography variant="h6" sx={{ mb: 2 }}>Job Overview</Typography>
      <Grid container spacing={2}>
        {Object.entries(overview).map(([key, value]) => {
          // Add icons based on the key (information type)
          let Icon;
          switch (key) {
            case 'Posted on':
            case 'Expires on':
              Icon = CalendarTodayIcon;
              break;
            case 'Salary':
              Icon = AttachMoneyIcon;
              break;
            case 'Location':
              Icon = LocationOnIcon;
              break;
            case 'Experience':
              Icon = WorkIcon;
              break;
            case 'Job Type': // Add case for Job Type
              Icon = WorkOutlineIcon;
              break;
            default:
              Icon = null;
          }

          return (
            <Grid item xs={6} key={key}>
              <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                {Icon && <Icon sx={{ color: '#0A65CC', marginBottom: 1 }} />}
                <Typography variant="body2" color="text.secondary">{key}</Typography>
                <Typography variant="body1">{value}</Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </CardContent>
  </Card>
);

export default JobOverviewCard;
