import React, { useState } from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import FindEmployerCard from "./FindEmployerCard.jsx";
import PaginationComponent from "../BrowseCandidateComponents/Pagination.jsx";

const jobData = [
  {
    company: "Google",
    location: "San Francisco, CA",
    image: "https://via.placeholder.com/60", // Replace with real image URLs
    deadline: "3 days remaining",
  },
  {
    company: "Microsoft",
    location: "New York, NY",
    image: "https://via.placeholder.com/60",
    deadline: "1 week remaining",
  },
  {
    company: "Apple",
    location: "San Francisco, CA",
    image: "https://via.placeholder.com/60", // Replace with real image URLs
    deadline: "3 days remaining",
  },
  {
    company: "Amazon",
    location: "New York, NY",
    image: "https://via.placeholder.com/60",
    deadline: "1 week remaining",
  },
  {
    company: "Facebook",
    location: "San Francisco, CA",
    image: "https://via.placeholder.com/60", // Replace with real image URLs
    deadline: "3 days remaining",
  },
  {
    company: "Tesla",
    location: "Austin, TX",
    image: "https://via.placeholder.com/60",
    deadline: "5 days remaining",
  },
  {
    company: "LinkedIn",
    location: "Chicago, IL",
    image: "https://via.placeholder.com/60",
    deadline: "2 weeks remaining",
  },
  {
    company: "Netflix",
    location: "Seattle, WA",
    image: "https://via.placeholder.com/60",
    deadline: "4 days remaining",
  },
];

const FindEmployer = () => {
  const [page, setPage] = useState(1);
  const perPage = 6; // Removed useState for a static value
  const sortedJobs = jobData;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.max(1, Math.ceil(sortedJobs.length / perPage)); // Ensure at least 1 page
  const jobsToShow = sortedJobs.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <Container maxWidth="lg" sx={{ flex: 1, padding: "2rem", bgcolor: "#ffffff" }}>
        {/* Jobs List */}
        <Grid container spacing={2}>
          {jobsToShow.map((job, index) => (
            <Grid item xs={12} key={index}>
              <FindEmployerCard {...job} />
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <PaginationComponent count={totalPages} page={page} onChange={handlePageChange} />
          </Box>
        )}
      </Container>
    </div>
  );
};

export default FindEmployer;
