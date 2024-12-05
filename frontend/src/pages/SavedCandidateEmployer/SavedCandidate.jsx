import React, { useState } from 'react';
import { Box, Grid, Typography, Container, List, ListItem, ListItemText, Link  } from '@mui/material';
import SaveCard from '../../components/SavedCandidateEmployer/SaveCard.jsx';
import PaginationComponent from '../../components/BrowseCandidateComponents/Pagination.jsx';

const candidateData = [
  { 
    candidateName: 'Alice Johnson', 
    specialization: 'Data Science', 
    imageLink: 'https://example.com/images/alice.jpg' 
  },
  { 
    candidateName: 'Bob Smith', 
    specialization: 'UI/UX Design', 
    imageLink: 'https://example.com/images/bob.jpg' 
  },
  { 
    candidateName: 'Carol Lee', 
    specialization: 'Frontend Development', 
    imageLink: 'https://example.com/images/carol.jpg' 
  },
  { 
    candidateName: 'David Brown', 
    specialization: 'Backend Development', 
    imageLink: 'https://example.com/images/david.jpg' 
  },
  { 
    candidateName: 'Eve Davis', 
    specialization: 'Full Stack Development', 
    imageLink: 'https://example.com/images/eve.jpg' 
  },
  { 
    candidateName: 'Frank Wilson', 
    specialization: 'Cybersecurity', 
    imageLink: 'https://example.com/images/frank.jpg' 
  },
  { 
    candidateName: 'Grace Moore', 
    specialization: 'Product Management', 
    imageLink: 'https://example.com/images/grace.jpg' 
  },
  { 
    candidateName: 'Hank Adams', 
    specialization: 'Machine Learning', 
    imageLink: 'https://example.com/images/hank.jpg' 
  },
  { 
    candidateName: 'Ivy Thomas', 
    specialization: 'Cloud Engineering', 
    imageLink: 'https://example.com/images/ivy.jpg' 
  },
  { 
    candidateName: 'Jack White', 
    specialization: 'Mobile App Development', 
    imageLink: 'https://example.com/images/jack.jpg' 
  },
];

const SavedCandidate = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(8);
  const [sortedCandidate] = useState(candidateData);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(sortedCandidate.length / perPage);
  const candidateToShow = sortedCandidate.slice((page - 1) * perPage, page * perPage);

 
  return (
    <div>
       <Box sx={{ display: 'flex', Height: '100vh', bgcolor: '#ffffff', overflow: 'hidden', width: '80% !important' }}>
      <Container maxWidth="xl" sx={{ flex: 1, padding: '1rem', bgcolor: '#ffffff'  , paddingX : 0}}>
        <Typography variant="h6" sx={{ mt: 1 , mb : 1 , display:'flex' , alignItems : "center", gap : 1}}>
          Saved Candidate <Typography variant="h6">({ candidateData.length})</Typography>
         
        </Typography>

        <Grid container spacing={2}>
          {candidateToShow.map((job, index) => (
            <Grid item xs={12} key={index}>
              <SaveCard {...job} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <PaginationComponent count={totalPages} page={page} onChange={handlePageChange} />
        </Box>
      </Container>
    </Box>
    </div>
  )
}

export default SavedCandidate;