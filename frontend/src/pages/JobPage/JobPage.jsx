import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Navbar from '../../components/Navbar.jsx';
import JobHeader from '../../components/JobPageComponents/JobHeader.jsx';
import JobDescription from '../../components/JobDescription.jsx';
import JobOverviewCard from '../../components/JobPageComponents/JobOverviewCard.jsx';
import Responsibilities from '../../components/JobPageComponents/Responsibilities.jsx';
import EmployerDetailsCard from '../../components/JobPageComponents/EmployerDetailsCard.jsx';
import RelatedJobCard from '../../components/RelatedJobCard.jsx';
import JobDetails from '../../components/JobPageComponents/JobDetails.jsx';
import Share from '../../components/Share.jsx';

const JobPage = () => {
  const jobData = {
    title: "Senior UX Designer",
    company: "Instagram",
    type: "Full Time",
    website: "https://instagram.com",
    contact: "contact@instagram.com",
    description: "As Senior UI/UX Designer , you'll be responsible for collecting and translating user insights into delightful experiences. Ultimately, you’ll create both functional and visually appealing features that address our customers' needs. You will use your creativity and eye for design – along with your technical knowledge – to develop great experiences. You'll work with a visual designer, product manager and our development team. Together you'll deliver UI mockups, prototypes, MVPs and final products. In this role, you'll have the privilege of being the voice of our customers. You'll translate their needs into user-friendly designs and have a direct impact on the customer's user-experience.",
    overview: {
      "Posted on": "June 1, 2021",
      "Expires on": "June 30, 2021",
      "Salary": "$60k-$80k",
      "Location": "New York, USA",
      "Experience": "10-15 Years",
      "Job Type": "Full Time",
    },
    responsibilities: [
      "UX designers research users and their needs, and analyze the results. They also develop personas and usage scenarios.",
      "Strong background in UX design",
      "UX designers create wireframes, prototypes, user flows, and other deliverables to communicate the user experience. They also design user interfaces and interaction models.",
      "Curate the overall user experience",
      "Develop UX patterns and standards",
      "Collaborate with team members",
    ],
    employer: {
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png",
      name: "Instagram",
      industry: "Social Networking Service",
      founded: "March 21, 2006",
      type: "Private Company",
      employees: "120-300",
      contact: {
        phone: "440-555-0120",
        email: "twitter@gmail.com",
        website: "https://twitter.com",
      },
    },
    relatedJobs: [
      { logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" , company : "Microsoft", title: "Visual Designer", type: "Full Time", location: "USA", salary: "$50k-$70k" },
      { logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png", company : "Microsoft" ,title: "Front End Developer", type: "Contract", location: "Australia", salary: "$80k-$90k" },
      { logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png", company : "Microsoft"  , title: "Technical Support Specialist", type: "Full Time", location: "France", salary: "$30k-$40k" },
      { logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png", company : "Microsoft"  , title: "Technical Support Specialist", type: "Full Time", location: "France", salary: "$30k-$40k" },
    ],
    badges: [
      { label: "Featured", color: "#FFCDD2", textColor: "#D32F2F" },  // Light red badge
      { label: "Full Time", color: "#BBDEFB", textColor: "#1976D2" },  // Light blue badge
      { label: "Urgent", color: "#FFF3E0", textColor: "#FF9800" },  // Light orange badge
    ],
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Navbar />
      </Container>
    <br />
    {/* <Container maxWidth="lg" sx={{ mt: 4 }}> */}
        <JobDetails />
      {/* </Container> */}

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <JobHeader
          title={jobData.title}
          company={jobData.company}
          type={jobData.type}
          website={jobData.website}
          contact={jobData.contact}
          badges={jobData.badges}
          logoUrl={jobData.employer.logoUrl}
        />

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ width: '100%', height: '400px', overflowY: 'auto' }}>
              <JobDescription description={jobData.description} />
            </Box>

            <Box sx={{ width: '100%', height: '400px', overflowY: 'auto', mt: 3 }}>
              <Responsibilities responsibilities={jobData.responsibilities} />
              <Share></Share>
            </Box>

          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ width: '100%', height: '400px', overflowY: 'auto' }}>
              <JobOverviewCard overview={jobData.overview} />
            </Box>

            <Box sx={{ width: '100%', height: 'auto', mt: 3 }}>
              <EmployerDetailsCard employer={jobData.employer} />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Related Jobs
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {jobData.relatedJobs.map((job, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <RelatedJobCard job={job} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default JobPage;
