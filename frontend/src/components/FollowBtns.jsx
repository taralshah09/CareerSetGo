import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material'; 

export default function FollowBtns(){
    return(
        <Box sx={{ display: 'flex', mt: 2 }}>
        <IconButton 
          sx={{
            width: 30,
            height: 30,
            borderRadius: '5px',
            mr: 2,
            backgroundColor:  "#0A65CC",
            '&:hover': { backgroundColor: '#1565c0' }
          }} 
          href="https://facebook.com" target="_blank" rel="noopener noreferrer"
        >
          <Facebook sx={{ color: 'white' }} />
        </IconButton>

        <IconButton 
          sx={{
            width: 30,
            height: 30,
            borderRadius: '5px',
            mr: 2,
            backgroundColor: "#0A65CC",
            '&:hover': { backgroundColor: '#1565c0' }
          }} 
          href="https://twitter.com" target="_blank" rel="noopener noreferrer"
        >
          <Twitter sx={{ color: 'white' }} />
        </IconButton>

        <IconButton 
          sx={{
            width: 30,
            height: 30,
            borderRadius: '5px',
            mr: 2,
            backgroundColor:   "#0A65CC",
            '&:hover': { backgroundColor: '#1565c0' }
          }} 
          href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
        >
          <LinkedIn sx={{ color: 'white' }} />
        </IconButton>

        <IconButton 
          sx={{
            width: 30,
            height: 30,
            borderRadius: '5px',
            backgroundColor: "#0A65CC",
            '&:hover': { backgroundColor: '#1565c0' }
          }} 
          href="https://instagram.com" target="_blank" rel="noopener noreferrer"
        >
          <Instagram sx={{ color: 'white' }} />
        </IconButton>
      </Box>
    )
}
