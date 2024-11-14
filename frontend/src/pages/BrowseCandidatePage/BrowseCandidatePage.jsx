import React, { useState } from 'react';
import FilterSidebar from '../../components/BrowseCandidateComponents/FilterSidebar';
import CandidateCard from '../../components/BrowseCandidateComponents/CandidateCard';
import PaginationComponent from '../../components/BrowseCandidateComponents/Pagination';
import { Box, Grid, Typography, Container } from '@mui/material';
import FilterOptions from '../../components/BrowseCandidateComponents/FilterOptions';
import FindEmployers from '../../components/BrowseCandidateComponents/FindEmployers';

const candidatesData = [
  {
    name: 'John Doe',
    jobTitle: 'Software Engineer',
    location: 'San Francisco, CA',
    imageUrl: 'https://example.com/image1.jpg',
    biography: 'I am a passionate software engineer with over 5 years of experience in full-stack development, specializing in building scalable web applications using the latest technologies. I have a strong background in both front-end and back-end development, and I thrive in collaborative environments where I can contribute to innovative solutions that improve user experiences and drive business success. I am proficient in JavaScript, Python, React, Node.js, and many other tools that help me create efficient, maintainable, and user-friendly software. I am constantly learning new technologies to stay at the forefront of the field and to better serve my team and clients.',
    coverLetter: `Dear Hiring Manager,

I am writing to express my interest in the Software Engineer position at your company. With over five years of experience in full-stack development, I have honed my ability to design and build web applications that are both scalable and user-friendly. I am particularly drawn to your company's commitment to innovation, and I am eager to bring my technical skills to your team.

Throughout my career, I have worked with a variety of technologies including React, Node.js, and MongoDB, which have allowed me to develop and maintain high-performance applications. I am excited about the opportunity to contribute to your team and help build solutions that have a meaningful impact.

I am confident that my background in full-stack development and my passion for solving complex technical challenges make me a perfect fit for this role. I look forward to the possibility of discussing how my skills and experience can contribute to your company's continued success.

Sincerely,
John Doe`,
    details: {
      dob: '1995-08-12',
      nationality: 'American',
      maritalStatus: 'Single',
      gender: 'Male',
      experience: 5,
      education: 'B.Sc. Computer Science',
    },
    resumeUrl: 'https://example.com/resume1.pdf',
    contactInfo: {
      website: 'https://johnsportfolio.com',
      location: 'San Francisco, CA',
      phone: { primary: '+1 (415) 123-4567', secondary: '+1 (415) 234-5678' },
      email: 'johndoe@email.com',
    },
    socialMediaLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    },
  },
  {
    name: 'Jane Smith',
    jobTitle: 'Data Scientist',
    location: 'New York, NY',
    imageUrl: 'https://example.com/image2.jpg',
    biography: 'I specialize in machine learning, data analysis, and statistical modeling, with a focus on extracting valuable insights from complex datasets. Over the past few years, I have worked on numerous projects involving predictive modeling, natural language processing, and deep learning. I have developed an excellent understanding of statistical techniques and how to apply them to solve business problems. I am passionate about transforming raw data into actionable insights that can drive better decision-making, optimize business processes, and improve customer experiences.',
    coverLetter: `Dear Hiring Manager,

I am writing to express my interest in the Data Scientist position at your company. With a Master’s degree in Data Science and over four years of experience working with data, I have gained deep expertise in building predictive models, performing statistical analysis, and uncovering insights that drive business value. I am particularly excited about your company's focus on using data to optimize operations, and I believe my background aligns perfectly with your needs.

Throughout my career, I have worked with a variety of machine learning algorithms and data visualization tools to build models that provide accurate predictions and actionable insights. I am passionate about using data to make strategic decisions that drive success, and I am eager to contribute my skills to your team.

I would welcome the opportunity to discuss how my background and skills could benefit your company. I look forward to the chance to speak with you further.

Sincerely,
Jane Smith`,
    details: {
      dob: '1996-05-22',
      nationality: 'American',
      maritalStatus: 'Married',
      gender: 'Female',
      experience: 4,
      education: 'M.Sc. Data Science',
    },
    resumeUrl: 'https://example.com/resume2.pdf',
    contactInfo: {
      website: 'https://janesmith.com',
      location: 'New York, NY',
      phone: { primary: '+1 (212) 555-7890', secondary: '+1 (212) 555-8901' },
      email: 'janesmith@email.com',
    },
    socialMediaLinks: {
      linkedin: 'https://linkedin.com/in/janesmith',
      github: 'https://github.com/janesmith',
    },
  },
  {
    name: 'Alex Johnson',
    jobTitle: 'UI/UX Designer',
    location: 'Los Angeles, CA',
    imageUrl: 'https://example.com/image3.jpg',
    biography: 'I am passionate about creating intuitive and visually appealing user experiences. I specialize in UI/UX design with a focus on user-centered design principles and creating seamless digital experiences. My background in graphic design combined with user research allows me to create designs that are not only aesthetically pleasing but also highly functional and accessible. I am experienced in using design tools like Sketch, Figma, and Adobe XD, and I am always striving to improve my design process to ensure the best possible outcome for both users and businesses.',
    coverLetter: `Dear Hiring Manager,

I am very interested in the UI/UX Designer position at your company. With a background in graphic design and a passion for user-centered design, I believe I can help create exceptional digital experiences that delight users and meet business objectives. I have worked on projects ranging from mobile apps to large-scale web applications, always striving to ensure that the user experience is as intuitive and seamless as possible.

In my previous roles, I have collaborated closely with product teams and developers to ensure that designs are not only visually appealing but also technically feasible. I am excited about the opportunity to work with your team to design solutions that meet your users' needs and enhance the overall user experience.

I would love the opportunity to discuss how I can contribute to your team and help elevate the design of your products.

Sincerely,
Alex Johnson`,
    details: {
      dob: '1998-02-15',
      nationality: 'American',
      maritalStatus: 'Single',
      gender: 'Male',
      experience: 3,
      education: 'B.A. Graphic Design',
    },
    resumeUrl: 'https://example.com/resume3.pdf',
    contactInfo: {
      website: 'https://alexjohnsondesigns.com',
      location: 'Los Angeles, CA',
      phone: { primary: '+1 (323) 555-1234', secondary: '+1 (323) 555-5678' },
      email: 'alexjohnson@email.com',
    },
    socialMediaLinks: {
      linkedin: 'https://linkedin.com/in/alexjohnson',
      github: 'https://github.com/alexjohnson',
    },
  },
  {
    name: 'Emily Davis',
    jobTitle: 'Product Manager',
    location: 'Chicago, IL',
    imageUrl: 'https://example.com/image4.jpg',
    biography: 'Experienced product manager with a track record of delivering high-impact products in fast-paced environments. I specialize in leading cross-functional teams to develop and launch innovative products that meet customer needs and drive business growth. My experience includes working with both technical and non-technical stakeholders to ensure that the product vision is executed effectively and efficiently. I am highly organized, goal-oriented, and passionate about delivering value to users and stakeholders alike.',
    coverLetter: `Dear Hiring Manager,

I am writing to express my interest in the Product Manager position at your company. With over six years of experience in product management, I have successfully led cross-functional teams to deliver innovative products that have made a significant impact on users and business performance. I am particularly drawn to your company's vision, and I believe my background in managing the full product lifecycle aligns well with your needs.

In my previous roles, I have worked with design, engineering, and marketing teams to ensure that products meet user needs, stay within budget, and are delivered on time. I am confident that my skills in product strategy, stakeholder management, and team leadership will enable me to contribute to your company's growth and success.

I would love the opportunity to further discuss how my experience and skills can contribute to your team. Thank you for your consideration.

Sincerely,
Emily Davis`,
    details: {
      dob: '1994-11-20',
      nationality: 'American',
      maritalStatus: 'Married',
      gender: 'Female',
      experience: 6,
      education: 'M.B.A. Product Management',
    },
    resumeUrl: 'https://example.com/resume4.pdf',
    contactInfo: {
      website: 'https://emilydavispm.com',
      location: 'Chicago, IL',
      phone: { primary: '+1 (312) 555-2345', secondary: '+1 (312) 555-6789' },
      email: 'emilydavis@email.com',
    },
    socialMediaLinks: {
      linkedin: 'https://linkedin.com/in/emilydavis',
      github: 'https://github.com/emilydavis',
    },
  },
  {
    name: 'Michael Brown',
    jobTitle: 'Web Developer',
    location: 'Seattle, WA',
    imageUrl: 'https://example.com/image5.jpg',
    biography: 'As a full-stack web developer, I specialize in building dynamic, responsive websites and web applications. My expertise includes front-end development using React, and back-end development using Node.js and Express. I have experience working with both small startups and large corporations, and I thrive in environments where I can take ownership of projects and deliver high-quality, user-friendly solutions. I am passionate about coding and always looking for ways to improve the performance and scalability of the applications I build.',
    coverLetter: `Dear Hiring Manager,

I am excited to apply for the Web Developer position at your company. With over four years of experience in full-stack web development, I have had the opportunity to work on a wide range of projects, from e-commerce sites to custom web applications. My experience with React, Node.js, and Express allows me to build fast, responsive, and scalable websites that provide excellent user experiences.

I am particularly drawn to your company's focus on innovation, and I am eager to contribute my skills to building cutting-edge web applications that push the boundaries of what is possible. I would love the opportunity to join your team and help create products that make a lasting impact on your users.

Thank you for your time and consideration.

Sincerely,
Michael Brown`,
    details: {
      dob: '1990-07-08',
      nationality: 'American',
      maritalStatus: 'Single',
      gender: 'Male',
      experience: 4,
      education: 'B.S. Computer Science',
    },
    resumeUrl: 'https://example.com/resume5.pdf',
    contactInfo: {
      website: 'https://michaelbrownwebdev.com',
      location: 'Seattle, WA',
      phone: { primary: '+1 (206) 555-3456', secondary: '+1 (206) 555-7890' },
      email: 'michaelbrown@email.com',
    },
    socialMediaLinks: {
      linkedin: 'https://linkedin.com/in/michaelbrown',
      github: 'https://github.com/michaelbrown',
    },
  }
];

const BrowseCandidatePage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [sortedCandidates, setSortedCandidates] = useState(candidatesData);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSortChange = (sortValue) => {
    let sortedData = [...candidatesData];
    if (sortValue === 'experience') {
      sortedData.sort((a, b) => b.experience - a.experience);
    } else if (sortValue === 'location') {
      sortedData.sort((a, b) => a.location.localeCompare(b.location));
    }
    setSortedCandidates(sortedData);
  };

  const handleFilterChange = (filterValue) => {
    let filteredData = [...candidatesData];
    if (filterValue === 'full-time') {
      filteredData = filteredData.filter(
        (candidate) => candidate.jobTitle.includes('Officer') || candidate.jobTitle.includes('Designer')
      );
    }
    setSortedCandidates(filteredData);
  };

  const totalPages = Math.ceil(sortedCandidates.length / perPage);
  const candidatesToShow = sortedCandidates.slice((page - 1) * perPage, page * perPage);

  return (
    <Box>
      <FindEmployers />
      <Container maxWidth="lg" sx={{ mt: 6 }}>

        <Box sx={{ width: '100%', mb: 3 }}>
          <FilterOptions 
            onSortChange={handleSortChange} 
            onFilterChange={handleFilterChange} 
            setPerPage={setPerPage}
          />
        </Box>

        <Box sx={{ display: 'flex' }}>
          <FilterSidebar sx={{ width: '25%' }} />
          <Box sx={{ flex: 1, padding: '1rem' }}>
            <Grid container spacing={2}>
              {candidatesToShow.map((candidate, index) => (
                <Grid item xs={12} key={index}>
                  <CandidateCard {...candidate} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <PaginationComponent 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BrowseCandidatePage;
