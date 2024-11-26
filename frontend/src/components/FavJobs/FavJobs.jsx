import React, { useState } from 'react';
import "./FavJobs.css"
import { Box, Grid, Typography, Container, List, ListItem, ListItemText, Link } from '@mui/material';
import JobCard from '../FavJobCardComponent/FavJobCard.jsx';
import PaginationComponent from '../BrowseCandidateComponents/Pagination.jsx';

const jobData = [
  {
    jobTitle: 'Software Engineer',
    jobTiming: 'Full-time',
    location: 'San Francisco, CA',
    salary: '$120,000 - $140,000',
    deadline: '3 days remaining',
  },
  {
    jobTitle: 'Software Engineer',
    jobTiming: 'Full-time',
    location: 'San Francisco, CA',
    salary: '$120,000 - $140,000',
    deadline: '3 days remaining',
  },

  {
    jobTitle: 'UI/UX Designer',
    jobTiming: 'Full-time',
    location: 'Los Angeles, CA',
    salary: '$75,000 - $90,000',
    deadline: '5 days remaining',
  },
  {
    jobTitle: 'Product Manager',
    jobTiming: 'Full-time',
    location: 'Chicago, IL',
    salary: '$110,000 - $130,000',
    deadline: '1 day remaining',
  },

  {
    jobTitle: 'Software Engineer',
    jobTiming: 'Full-time',
    location: 'San Francisco, CA',
    salary: '$120,000 - $140,000',
    deadline: '3 days remaining',
  },
  {
    jobTitle: 'Data Scientist',
    jobTiming: 'Part-time',
    location: 'New York, NY',
    salary: '$90,000 - $110,000',
    deadline: 'Deadline expired',
  },
  {
    jobTitle: 'UI/UX Designer',
    jobTiming: 'Full-time',
    location: 'Los Angeles, CA',
    salary: '$75,000 - $90,000',
    deadline: '5 days remaining',
  },
  {
    jobTitle: 'UI/UX Designer',
    jobTiming: 'Full-time',
    location: 'Los Angeles, CA',
    salary: '$75,000 - $90,000',
    deadline: '5 days remaining',
  },
  {
    jobTitle: 'Product Manager',
    jobTiming: 'Full-time',
    location: 'Chicago, IL',
    salary: '$110,000 - $130,000',
    deadline: '1 day remaining',
  },

  {
    jobTitle: 'Software Engineer',
    jobTiming: 'Full-time',
    location: 'San Francisco, CA',
    salary: '$120,000 - $140,000',
    deadline: '3 days remaining',
  },
  {
    jobTitle: 'UI/UX Designer',
    jobTiming: 'Full-time',
    location: 'Los Angeles, CA',
    salary: '$75,000 - $90,000',
    deadline: '5 days remaining',
  },
  {
    jobTitle: 'UI/UX Designer',
    jobTiming: 'Full-time',
    location: 'Los Angeles, CA',
    salary: '$75,000 - $90,000',
    deadline: '5 days remaining',
  },
  {
    jobTitle: 'Software Engineer',
    jobTiming: 'Full-time',
    location: 'San Francisco, CA',
    salary: '$120,000 - $140,000',
    deadline: '3 days remaining',
  },

  {
    jobTitle: 'UI/UX Designer',
    jobTiming: 'Full-time',
    location: 'Los Angeles, CA',
    salary: '$75,000 - $90,000',
    deadline: '5 days remaining',
  },
  {
    jobTitle: 'Product Manager',
    jobTiming: 'Full-time',
    location: 'Chicago, IL',
    salary: '$110,000 - $130,000',
    deadline: '1 day remaining',
  },
  {
    jobTitle: 'Web Developer',
    jobTiming: 'Full-time',
    location: 'Seattle, WA',
    salary: '$95,000 - $105,000',
    deadline: 'Deadline expired',
  },
];

const FavJobs = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);
  const [sortedJobs] = useState(jobData);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(sortedJobs.length / perPage);
  const jobsToShow = sortedJobs.slice((page - 1) * perPage, page * perPage);
  return (
    <div className='favjobs-container'>
      <Box sx={{ display: 'flex', width: "100%", minHeight: '100vh', overflow: 'hidden' }}>
        <Container maxWidth="lg" sx={{ flex: 1, padding: '2rem', bgcolor: '#ffffff' }}>
          <Typography variant="h4" sx={{ mb: 4, display: 'flex' }}>
            Favourite Jobs <Typography variant="h6" color='#767F8C' sx={{ mt: 1 }} >({jobData.length})</Typography>

          </Typography>

          <Grid container spacing={2}>
            {jobsToShow.map((job, index) => (
              <Grid item xs={12} key={index}>
                <JobCard {...job} />
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

export default FavJobs
