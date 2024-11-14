import { Box, Typography, TextField, Button, FormControlLabel, Checkbox, Stack, Link } from '@mui/material';
import SocialButtons from '../SocialButtons';

const ForgotPasswordForm = () => {
  return (
    <Box component="form" display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5">Forgot Password</Typography>
      <Typography variant="body2">
       Fo Back To  <Link href="#">Sign in</Link>
      </Typography>
      <Typography variant="body2">
        Don’t have an account? <Link href="#">Create Account</Link>
      </Typography>
      <TextField label="Email address" variant="outlined" fullWidth />
      <Button variant="contained" color="primary" fullWidth>
        Reset Password
      </Button>
      <Typography align="center" variant="body2">or</Typography>
      <SocialButtons />
    </Box>
  );
};

export default ForgotPasswordForm;
