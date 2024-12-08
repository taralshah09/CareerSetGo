import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Button, Snackbar, Alert, IconButton } from '@mui/material';
import JobHeader from '../../components/JobPageComponents/JobHeader.jsx';
import JobDescription from '../../components/JobDescription.jsx';
import JobOverviewCard from '../../components/JobPageComponents/JobOverviewCard.jsx';
import Responsibilities from '../../components/JobPageComponents/Responsibilities.jsx';
import EmployerDetailsCard from '../../components/JobPageComponents/EmployerDetailsCard.jsx';
import RelatedJobCard from '../../components/RelatedJobCard.jsx';
import Share from '../../components/Share.jsx';
import { useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider.jsx';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SkillGapAnalysis from '../../components/SkillGapAnalysis/SkillGapAnalysis.jsx';
import MoreDetailsModal from '../../components/MoreDetailsModal/MoreDetailsModal.jsx';


const JobPage = () => {
  const [skillGapResult, setSkillGapResult] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const location = useLocation();
  const { job } = location.state || {}
  const jobSkills = job.skills_required.split(", ");
  console.log(job)
  const { user, skills } = useAuth()
  const user_id = user.id;
  const skillNames = skills.map(skill => skill.name);
  console.log("Skillnames : " + skillNames)

  const { id } = useParams()
  const job_id = id;
  const [isMoreDetailsOpen, setIsMoreDetailsOpen] = useState(false);
  const handleOpenMoreDetails = () => setIsMoreDetailsOpen(true);
  const handleCloseMoreDetails = () => setIsMoreDetailsOpen(false);
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
      { logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png", company: "Microsoft", title: "Visual Designer", type: "Full Time", location: "USA", salary: "$50k-$70k" },
      { logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png", company: "Microsoft", title: "Front End Developer", type: "Contract", location: "Australia", salary: "$80k-$90k" },
      { logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png", company: "Microsoft", title: "Technical Support Specialist", type: "Full Time", location: "France", salary: "$30k-$40k" },
      { logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png", company: "Microsoft", title: "Technical Support Specialist", type: "Full Time", location: "France", salary: "$30k-$40k" },
    ],
    badges: [
      { label: "Featured", color: "#FFCDD2", textColor: "#D32F2F" },  // Light red badge
      { label: "Full Time", color: "#BBDEFB", textColor: "#1976D2" },  // Light blue badge
      { label: "Urgent", color: "#FFF3E0", textColor: "#FF9800" },  // Light orange badge
    ],
  };


  const handleSkillGapAnalysis = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/skill-gap-analysis/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : '',
        },
        body: JSON.stringify({
          job_id: job_id,
          user_id: user_id,
          job_skills: job.skills_required ? job.skills_required.split(',').map(skill => skill.trim()) : [],
          user_skills: skillNames
        })
      });

      if (!response.ok) {
        throw new Error('Skill gap analysis failed');
      }

      const data = await response.json();
      setSkillGapResult(data);
      setSnackbarMessage('Skill gap analysis completed successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error performing skill gap analysis:', error);
      setSnackbarMessage('Failed to perform skill gap analysis');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };



  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <JobHeader
          title={job.title}
          company={job.company_name}
          type={jobData.type}
          website={job.job_domain}
          contact={jobData.contact}
          badges={jobData.badges}
          logoUrl={jobData.employer.logoUrl}
        />

        <div>
          <Box sx={{ display: 'flex', gap: 2, marginTop: "40px" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#0A65CC',
                color: 'white',
                '&:hover': { backgroundColor: '#0A65CC' },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Apply Now
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#0A65CC',
                color: 'white',
                '&:hover': { backgroundColor: '#0A65CC' },
              }}
              onClick={handleOpenMoreDetails}
            >
              More Details
            </Button>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSkillGapAnalysis}
            sx={{ my: 2 }}
          >
            Skill Gap Analysis
          </Button>
        </div>

        {skillGapResult && <SkillGapAnalysis skillGapResult={skillGapResult} setSkillGapResult={setSkillGapResult} />}


        <Grid container spacing={4} marginTop={2}>
          <Grid item xs={12} md={8}>
            <Box sx={{ width: '100%', height: '400px', overflowY: 'auto' }}>
              <JobDescription description={job.description} />
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>


      </Snackbar>

      <MoreDetailsModal
        open={isMoreDetailsOpen}
        onClose={handleCloseMoreDetails}
        userSkills={skillNames}
        jobSkills={jobSkills}
        skills={skills}
      />
    </Box>
  );
};

export default JobPage;