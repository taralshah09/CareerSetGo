import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import BusinessIcon from '@mui/icons-material/Business';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const SideInfo = () => (
  <Box
    position="relative"
    display="flex"
    flexDirection="column"
    justifyContent="flex-end"
    alignItems="center"
    padding={4}
    sx={{
      color: 'white',
      overflow: 'hidden',
      width: '100%',
      height: '100vh',
      maxWidth: '100%',
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundImage: `linear-gradient(rgba(4, 26, 60, 0.9), rgba(4, 26, 60, 0.45)), url("https://s3-alpha-sig.figma.com/img/eae3/13a4/8883a46e7a2a60ee806e73a8052191be?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ctfdl3gJVbAH9VmJvj2Gmwm-jz5JVm-OKnRuKok~k5yQ5sgsGn1RWsDkVTI4TTkYEdOBsb4Qf2W-s0SGda~pH0JX~evws8Q3ruspR8vylSSgMyIa6chDmZYU3HSgK1Mlqgs51cQUq-N1SModOJWJIfZiwLMX5w9ADT8FLNIJKUXi-IRvoGc0xt55lAVFsWRMSlbCHJt57wntkFpzHLFCx0R0KM9luQDBq8MBi49qxwdvkNNxbgYTNzzhSCLEzKr8O1gsKH3H-WWLrN6U1LLl-X~QqXzJwg6CUN1gIxn4DBuSMCC282qetSUcWXIwTQ9DT3OuAUFYS87Do8vSWgl5Lw__")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(1)', 
        clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)',
      }}
    />
    
    <Box position="relative" zIndex={1} textAlign="center">
      <Typography variant="h6">
        Over 1,75,324 candidates waiting for good employees.
      </Typography>
      <Stack direction="row" spacing={4} marginTop={2} marginBottom={15}>
        <Box textAlign="center">
          <WorkOutlineIcon fontSize="large" />
          <Typography variant="h5">1,75,324</Typography>
          <Typography>Live Jobs</Typography>
        </Box>
        <Box textAlign="center">
          <BusinessIcon fontSize="large" />
          <Typography variant="h5">97,354</Typography>
          <Typography>Companies</Typography>
        </Box>
        <Box textAlign="center">
          <NewReleasesIcon fontSize="large" />
          <Typography variant="h5">7,532</Typography>
          <Typography>New Jobs</Typography>
        </Box>
      </Stack>
    </Box>
  </Box>
);

export default SideInfo;
