import React from 'react';
import { Card, CardContent, Typography, Box, Grid, IconButton } from '@mui/material';
import FollowBtns from '../FollowBtns'; 

const EmployerDetailsCard = ({ employer }) => (
  <Card variant="outlined" sx={{ mt: 4, borderColor: '#E7F0FA', borderWidth: 2 }}>
    <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
              src={employer.logoUrl}
              alt={`${employer.name} logo`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>

          <Box>
            <Typography variant="body1" fontWeight="bold">
              {employer.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {employer.industry}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Founded in:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{employer.founded}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Organization Type:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{employer.type}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Employees:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{employer.employees}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Phone:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{employer.contact.phone}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Email:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{employer.contact.email}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Website:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <a
                href={employer.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                {employer.contact.website}
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <FollowBtns></FollowBtns>
    </CardContent>
  </Card>
);

export default EmployerDetailsCard;
