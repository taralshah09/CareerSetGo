import { Box, Typography, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';

export default function Share(){
    return(
        <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Share :</Typography>
          <Button
            variant="outlined"
            startIcon={<FacebookIcon sx={{color : "#0A65CC"}}/>}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </Button>
          <Button
            variant="outlined"
            startIcon={<TwitterIcon sx={{color : "#0A65CC"}}/>}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </Button>
          <Button
            variant="outlined"
            startIcon={<PinterestIcon sx={{color : "#0A65CC"}}/>}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pinterest
          </Button>
        </Box>
      </Box>
    )
}