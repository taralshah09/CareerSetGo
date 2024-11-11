import { Box, Typography, TextField, Button, FormControlLabel, Checkbox, Stack, Link } from '@mui/material';
import SocialButtons from '../SocialButtons';

const LoginForm = () => {
  return (
    <Box component="form" display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5">Sign in</Typography>
      <Typography variant="body2">
        Don’t have an account? <Link href="#">Create Account</Link>
      </Typography>
      <TextField label="Email address" variant="outlined" fullWidth />
      <Box display="flex" alignItems="center" gap={1}>
        <TextField label="Password" type="password" variant="outlined" fullWidth />
      </Box>
      <FormControlLabel control={<Checkbox />} label="Remember Me" />
      <Link href="#" variant="body2">Forgot password</Link>
      <Button variant="contained" color="primary" fullWidth>
        Sign In
      </Button>
      <Typography align="center" variant="body2">or</Typography>
      <SocialButtons />
    </Box>
  );
};

export default LoginForm;
