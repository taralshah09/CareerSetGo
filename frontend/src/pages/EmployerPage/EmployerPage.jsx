import React from 'react';
import Navbar from "../../components/Navbar";
import EmployerBar from "../../components/EmployerComponents/EmployerBar.jsx";
import OverlayCard from '../../components/EmployerComponents/OverlayCard.jsx';
import { Box, Container, Grid, Typography } from '@mui/material';
import JobDescription from '../../components/JobDescription.jsx';
import CompanyBenefits from '../../components/EmployerComponents/CompanyBenefits.jsx';
import Share from '../../components/Share.jsx';
import CompanyVision from '../../components/EmployerComponents/CompanyVision.jsx';
import CompanyDetailsCard from '../../components/EmployerComponents/CompanyDetailsCard.jsx';
import ContactInfoCard from '../../components/EmployerComponents/ContactInfoCard.jsx';
import FollowCard from '../../components/EmployerComponents/FollowCard.jsx';
import RelatedJobCard from '../../components/RelatedJobCard.jsx';
import './EmployerPage.css';

export default function EmployerPage() {
    const companyData = {
        companyName :"Twitter" ,
        industry : "Information Technology (IT)" ,
        logoUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png",
        title: "Senior UX Designer",
        company: "Instagram",
        type: "Full Time",
        website: "https://instagram.com",
        vision : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Randox, in facilisis sapien, fringilla tincidunt risus. Integer vel Randox, suscipit mauris ac, efficitur lorem. Curabitur Randox posuere orci, eget faucibus est semper non. Vivamus vitae neque at magna facilisis convallis sed et nisl. Mauris vel diam vel lorem varius ullamcorper. Nullam id interdum metus, ac scelerisque dolor. Randox aliquet, lacus non volutpat sagittis, ipsum augue interdum purus, id dapibus est odio at sapien. Proin egestas Randox arcu, ac fermentum est fermentum in." ,
        description: "As Senior UI/UX Designer , you'll be responsible for collecting and translating user insights into delightful experiences. Ultimately, you’ll create both functional and visually appealing features that address our customers' needs. You will use your creativity and eye for design – along with your technical knowledge – to develop great experiences. You'll work with a visual designer, product manager and our development team. Together you'll deliver UI mockups, prototypes, MVPs and final products. In this role, you'll have the privilege of being the voice of our customers. You'll translate their needs into user-friendly designs and have a direct impact on the customer's user-experience.",
        overview: {
          "Founded in": "June 14, 2021",
          "Organization Type": "Private Company",
          "Team Size": "100-150 Candidates",
          "Industry Types": "Technology",
        },
        companybenefits: [
          "UX designers research users and their needs, and analyze the results. They also develop personas and usage scenarios.",
          "Strong background in UX design",
          "UX designers create wireframes, prototypes, user flows, and other deliverables to communicate the user experience. They also design user interfaces and interaction models.",
          "Curate the overall user experience",
        ],
          contact: {
            phone: "440-555-0120",
            email: "twitter@gmail.com",
            website: "https://twitter.com",
          },
        openpositions: [
          { logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" , company : "Microsoft", title: "Visual Designer", type: "Full Time", location: "USA", salary: "$50k-$70k" },
          { logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png", company : "Microsoft" ,title: "Front End Developer", type: "Contract", location: "Australia", salary: "$80k-$90k" },
          { logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png", company : "Microsoft"  , title: "Technical Support Specialist", type: "Full Time", location: "France", salary: "$30k-$40k" },
          { logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png", company : "Microsoft"  , title: "Technical Support Specialist", type: "Full Time", location: "France", salary: "$30k-$40k" },
        ],
      };
    
    return (
        <Box>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Navbar />
            </Container>
            <br />
            <EmployerBar />
            <OverlayCard
                companyName={companyData.companyName}
                industry={companyData.industry}
                logoUrl={companyData.logoUrl}
            />
        <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box className="no-scrollbar" sx={{ width: '100%', height: '300px', overflowY: 'auto' }}>
              <JobDescription description={companyData.description} />
            </Box>

            <Box className="no-scrollbar" sx={{ width: '100%', height: '200px', overflowY: 'auto', mt: 3 }}>
              <CompanyBenefits companybenefits={companyData.companybenefits} />
            </Box>

            <Box className="no-scrollbar" sx={{ width: '100%', height: '300px', overflowY: 'auto', mt: 3 }}>
              <CompanyVision vision={companyData.vision} />
              <Share></Share>
            </Box>
            </Grid>

            <Grid item xs={12} md={4} mt={3}>
            <Box className="no-scrollbar" sx={{ width: '100%', height: '250px', overflowY: 'auto' }}>
              <CompanyDetailsCard overview={companyData.overview} />
            </Box>


            <Box className="no-scrollbar" sx={{ width: '100%', height: '300px', overflowY: 'auto' }}>
              <ContactInfoCard contact={companyData.contact} />
            </Box>

            <Box className="no-scrollbar" sx={{ width: '100%', height: '300px', overflowY: 'auto' }}>
              <FollowCard/>
            </Box>
          </Grid>
          </Grid>
          <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Open Positions
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {companyData.openpositions.map((job, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <RelatedJobCard job={job} />
              </Grid>
            ))}
          </Grid>
        </Box>
          </Container>
        </Box>
    );
}
