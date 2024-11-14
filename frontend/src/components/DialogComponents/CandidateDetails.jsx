import React from 'react';
import { Typography, Card, CardContent, Grid, ListItem, ListItemText } from '@mui/material';
import { Person, CalendarToday, LocationOn, Work, School, Accessibility } from '@mui/icons-material';

const CandidateDetails = ({ details }) => {
  if (!details || typeof details !== 'object' || Object.keys(details).length === 0) {
    return (
      <Card variant="outlined" sx={{ marginBottom: 2, borderColor: '#E7F0FA', borderWidth: 1 }}>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="div">
            No details available.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const customDetails = {
    DOB: details.dob,
    Nationality: details.nationality,
    'Marital Status': details.maritalStatus,
    Gender: details.gender,
    Experience: details.experience + ' years',
    Education: details.education,
  };

  const icons = {
    DOB: <CalendarToday sx={{ color: '#0A65CC' }} />,
    Nationality: <LocationOn sx={{ color: '#0A65CC' }} />,
    'Marital Status': <Accessibility sx={{ color: '#0A65CC' }} />,
    Gender: <Person sx={{ color: '#0A65CC' }} />,
    Experience: <Work sx={{ color: '#0A65CC' }} />,
    Education: <School sx={{ color: '#0A65CC' }} />,
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2, borderColor: '#E7F0FA', borderWidth: 1 }}>
      <CardContent>
        <Grid container spacing={1}> {/* Reduced spacing between elements */}
          {Object.entries(customDetails).map(([key, value], index) => (
            <Grid item xs={6} key={key}>
              <ListItem>
                <ListItemText
                  primary={
                    <Grid container direction="column" alignItems="center" spacing={0.5}> {/* Reduced spacing here */}
                      <Grid item>{icons[key]}</Grid>
                      <Grid item>
                        <Typography variant="body2" align="center">
                          <strong>{key}</strong>
                        </Typography>
                      </Grid>
                    </Grid>
                  }
                  secondary={<Typography variant="body2" align="center">{value}</Typography>}
                />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CandidateDetails;
