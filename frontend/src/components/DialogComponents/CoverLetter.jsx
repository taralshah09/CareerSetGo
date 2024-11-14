import React from 'react';
import { Typography } from '@mui/material';

const CoverLetter = ({ text }) => {
  // Split the text into paragraphs by detecting newline characters
  const paragraphs = text.split('\n').map((para, index) => (
    <Typography variant="body2" color="textSecondary" paragraph key={index}>
      {para}
    </Typography>
  ));

  return (
    <div style={{ marginBottom: '16px' }}>
      <Typography variant="h6">Cover Letter</Typography>
      {paragraphs}
    </div>
  );
};

export default CoverLetter;
