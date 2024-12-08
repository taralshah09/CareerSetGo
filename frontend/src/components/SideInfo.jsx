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
        backgroundImage: `linear-gradient(rgba(4, 26, 60, 0.6), rgba(4, 26, 60, 0.45)), url("../images/check-box-image.png")`,
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
