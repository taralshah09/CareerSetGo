import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import BusinessIcon from '@mui/icons-material/Business';

const CompanyDetailsCard = ({ overview }) => (
  <Card variant="outlined" sx={{ borderColor: '#E7F0FA', borderWidth: 2 }}>
    <CardContent>
      <Grid container spacing={2}>
        {Object.entries(overview).map(([key, value]) => {
          let Icon;
          switch (key) {
            case 'Founded in':
              Icon = CalendarTodayIcon;
              break;
            case 'Industry Types':
              Icon = BusinessIcon;
              break;
            case 'Organization Type':
              Icon = WorkIcon;
              break;
            case 'Team Size':
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

export default CompanyDetailsCard;
