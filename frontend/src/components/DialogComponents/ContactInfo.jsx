import React from 'react';
import { Typography, Card, CardContent, List, ListItem, ListItemText, Divider, Icon, Box } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';

const renderNestedObject = (obj) => {
  return Object.entries(obj).map(([key, value]) => (
    <div key={key}>
      <strong>{key}:</strong> {typeof value === 'object' ? renderNestedObject(value) : value}
    </div>
  ));
};

const getIcon = (key) => {
  switch (key.toLowerCase()) {
    case 'phone':
      return <PhoneIcon sx={{ color: '#0A65CC' }} />;
    case 'email':
      return <EmailIcon sx={{ color: '#0A65CC' }} />;
    case 'location':
      return <LocationOnIcon sx={{ color: '#0A65CC' }} />;
    case 'website':
      return <LanguageIcon sx={{ color: '#0A65CC' }} />;
    default:
      return <Icon sx={{ color: '#0A65CC' }}>info</Icon>;
  }
};

const ContactInfo = ({ contact }) => {
  const contactEntries = Object.entries(contact);
  return (
    <Card variant="outlined" sx={{ marginBottom: 2, borderColor: '#E7F0FA', borderWidth: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Contact Info
        </Typography>
        <List>
          {contactEntries.map(([key, value], index) => (
            <div key={key}>
              <ListItem sx={{ display: 'flex', alignItems: 'center', paddingY: 1 }}>
                {/* Icon and key text container */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2, minWidth: 100 }}>
                  {getIcon(key)}
                  <Typography variant="body2" sx={{ fontWeight: 'bold', marginLeft: 1, color: 'text.secondary' }}>
                    {key}
                  </Typography>
                </Box>
                {/* Display value or nested object */}
                <ListItemText
                  primary={<Typography variant="body1">{typeof value === 'object' ? renderNestedObject(value) : value}</Typography>}
                />
              </ListItem>
              {/* Render Divider except after the last item */}
              {index < contactEntries.length - 1 && <Divider sx={{ marginY: 1 }} />}
            </div>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
