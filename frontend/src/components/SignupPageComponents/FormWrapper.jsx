import React from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, MenuItem, Select, Link, Grid } from '@mui/material';
import SocialButtons from '../SocialButtons';

const FormWrapper = () => {
  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={2}
      width={350}
      margin="0 auto"
      padding={3}
    >
      <Grid container justifyContent="space-between" alignItems= "center">
        <Grid item>
            <h2>Create Account</h2>
            Already have an account?{' '}
        <Link href="/login" underline="hover" color="primary">
          Log in
        </Link>
        </Grid>
        <Grid item xs={4}>
          <Select defaultValue="Employers" variant="outlined" fullWidth>
            <MenuItem value="Employers">Employers</MenuItem>
          </Select>
        </Grid>
      </Grid>


      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField label="Full Name" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Username" variant="outlined" fullWidth />
        </Grid>
      </Grid>

      <TextField label="Email address" variant="outlined" fullWidth />
      <TextField label="Password" type="password" variant="outlined" fullWidth />
      <TextField label="Confirm Password" type="password" variant="outlined" fullWidth />

      <FormControlLabel
        control={<Checkbox />}
        label={
          <Typography variant="body2">
            I’ve read and agree with your <Link href="#">Terms of Services</Link>
          </Typography>
        }
      />

      <Grid container justifyContent="space-between">
        <Grid item xs = {12}>
          <Button variant="contained" color="primary" fullWidth>
            Create Account
          </Button>
        </Grid>
      </Grid>

      <SocialButtons />
    </Box>
  );
};

export default FormWrapper;
