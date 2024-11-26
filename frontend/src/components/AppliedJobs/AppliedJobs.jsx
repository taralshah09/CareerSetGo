import React from "react";
import { Box, Typography, Grid, Pagination } from "@mui/material";
import JobCard from "./JobCard";
import "./AppliedJobs.css"

const AppliedJobs = () => {
  const jobs = [
    {
      logo: "../images/c1.png",
      title: "Networking Engineer",
      badge: "Remote",
      location: "Washington",
      salary: "$50k - $80k/month",
      dateApplied: "Feb 2, 2019 19:28",
      status: "Active",
    },
    {
      logo: "../images/c2.png",
      title: "Product Designer",
      badge: "Full Time",
      location: "Dhaka",
      salary: "$50k - $80k/month",
      dateApplied: "Dec 7, 2019 23:26",
      status: "Active",
    },
    {
      logo: "../images/c3.png",
      title: "Junior Graphic Designer",
      badge: "Temporary",
      location: "Brazil",
      salary: "$50k - $80k/month",
      dateApplied: "Feb 2, 2019 19:28",
      status: "Active",
    },
    {
      logo: "../images/c1.png",
      title: "Networking Engineer",
      badge: "Remote",
      location: "Washington",
      salary: "$50k - $80k/month",
      dateApplied: "Feb 2, 2019 19:28",
      status: "Active",
    },
    {
      logo: "../images/c2.png",
      title: "Product Designer",
      badge: "Full Time",
      location: "Dhaka",
      salary: "$50k - $80k/month",
      dateApplied: "Dec 7, 2019 23:26",
      status: "Active",
    },
    {
      logo: "../images/c3.png",
      title: "Junior Graphic Designer",
      badge: "Temporary",
      location: "Brazil",
      salary: "$50k - $80k/month",
      dateApplied: "Feb 2, 2019 19:28",
      status: "Active",
    },
    {
      logo: "../images/c1.png",
      title: "Networking Engineer",
      badge: "Remote",
      location: "Washington",
      salary: "$50k - $80k/month",
      dateApplied: "Feb 2, 2019 19:28",
      status: "Active",
    },
    {
      logo: "../images/c2.png",
      title: "Product Designer",
      badge: "Full Time",
      location: "Dhaka",
      salary: "$50k - $80k/month",
      dateApplied: "Dec 7, 2019 23:26",
      status: "Active",
    },
    {
      logo: "../images/c3.png",
      title: "Junior Graphic Designer",
      badge: "Temporary",
      location: "Brazil",
      salary: "$50k - $80k/month",
      dateApplied: "Feb 2, 2019 19:28",
      status: "Active",
    },
    // More job entries...
  ];

  return (
    <Box>
      <Box sx={{ mt: 2.5, px: 2 }}>
        {/* Title */}
        <Typography className="heading" sx={{ mb: 2 }}>
          Applied Jobs ({jobs.length})
        </Typography>

        {/* Table Headers */}
        <Grid
          container
          alignItems="center"
          sx={{
            py: 2,
            backgroundColor: "#f9f9f9",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ fontWeight: "bold", ml: 2, color: "gray" }}>
              Jobs
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "gray", textAlign: "center" }}>
              Date Applied
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "gray", textAlign: "center" }}>
              Status
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "gray", textAlign: "center" }}>
              Action
            </Typography>
          </Grid>
        </Grid>

        {/* Job Cards */}
        <Box>
          {jobs.map((job, index) => (
            <JobCard
              key={index}
              logo={job.logo}
              title={job.title}
              badge={job.badge}
              location={job.location}
              salary={job.salary}
              dateApplied={job.dateApplied}
              status={job.status}
              onAction={() => alert(`Viewing details for ${job.title}`)}
            />
          ))}
        </Box>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination color="primary" />
        </Box>
      </Box>
    </Box>
  );
};

export default AppliedJobs;
