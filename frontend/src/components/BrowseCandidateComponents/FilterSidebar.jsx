import React, { useState } from 'react';
import { Box, Typography, Slider, Radio, FormControlLabel, Accordion, AccordionSummary, AccordionDetails, RadioGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FilterSidebar = () => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedEducation, setSelectedEducation] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  return (
    <Box sx={{ width: '25%', padding: '1rem' }}>

      {/* Location Slider */}
      <Accordion disableGutters sx={{ margin: 0 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Location Radius</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider defaultValue={32} aria-labelledby="location-slider" min={0} max={100} />
        </AccordionDetails>
      </Accordion>

      {/* Candidate Level Filter */}
      <Accordion disableGutters sx={{ margin: 0 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Candidate Level</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
            {['Entry Level', 'Mid Level', 'Expert Level'].map((level, index) => (
              <FormControlLabel 
                key={index} 
                value={level} 
                control={<Radio />} 
                label={level} 
                sx={{ color: '#464D61' }} 
              />
            ))}
          </RadioGroup>
        </AccordionDetails>
      </Accordion>

      {/* Experience Filter */}
      <Accordion disableGutters sx={{ margin: 0 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Experience</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup value={selectedExperience} onChange={(e) => setSelectedExperience(e.target.value)}>
            {['0-1 Years', '2-4 Years', '5-7 Years', '8-10 Years', '10+ Years'].map((experience, index) => (
              <FormControlLabel 
                key={index} 
                value={experience} 
                control={<Radio />} 
                label={experience} 
                sx={{ color: '#464D61' }} 
              />
            ))}
          </RadioGroup>
        </AccordionDetails>
      </Accordion>

      {/* Education Filter */}
      <Accordion disableGutters sx={{ margin: 0 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Education</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup value={selectedEducation} onChange={(e) => setSelectedEducation(e.target.value)}>
            {['High School', 'Associate Degree', 'Bachelor’s Degree', 'Master’s Degree'].map((education, index) => (
              <FormControlLabel 
                key={index} 
                value={education} 
                control={<Radio />} 
                label={education} 
                sx={{ color: '#464D61' }} 
              />
            ))}
          </RadioGroup>
        </AccordionDetails>
      </Accordion>

      {/* Gender Filter */}
      <Accordion disableGutters sx={{ margin: 0 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Gender</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
            {['Male', 'Female', 'Other'].map((gender, index) => (
              <FormControlLabel 
                key={index} 
                value={gender} 
                control={<Radio />} 
                label={gender} 
                sx={{ color: '#464D61' }} 
              />
            ))}
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FilterSidebar;
