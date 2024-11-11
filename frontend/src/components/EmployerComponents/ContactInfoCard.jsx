import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const ContactInfoCard = ({ contact }) => (
  <Card variant="outlined" sx={{ borderColor: '#E7F0FA', borderWidth: 2 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <LanguageIcon sx={{ color: '#0A65CC', marginRight: 1 }} />
        <Box>
          <Typography variant="caption" color="text.secondary">
            WEBSITE
          </Typography>
          <Typography variant="body1">{contact.website}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', alignItems: 'center', marginY: 2 }}>
        <PhoneIcon sx={{ color: '#0A65CC', marginRight: 1 }} />
        <Box>
          <Typography variant="caption" color="text.secondary">
            PHONE
          </Typography>
          <Typography variant="body1">{contact.phone}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
        <EmailIcon sx={{ color: '#0A65CC'
          , marginRight: 1 }} />
        <Box>
          <Typography variant="caption" color="text.secondary">
            EMAIL ADDRESS
          </Typography>
          <Typography variant="body1">{contact.email}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default ContactInfoCard;
