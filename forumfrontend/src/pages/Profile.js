import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import ProfileEditForm from '../components/ProfileEditForm';

const Profile = () => {
  const { user } = useContext(AuthContext); // Get user data from AuthContext
  const { id: profileID } = useParams(); // Get profileID from URL params
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  
  const token = user?.access_token; // Use token from AuthContext

  // Check if the profile belongs to the logged-in user
  const isMyself = user && user.user_id === parseInt(profileID);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`/api/profile/${profileID}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Use token in Authorization header
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
      }
    };
    fetchProfile();
  }, [profileID, token]); // Run effect when profileID or token changes

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  return (
    <div style={{ marginTop: 100 }}>
      {profile ? (
        <Container maxWidth="md">
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            {profile.name}'s Profile
          </Typography>

          <Card sx={{ boxShadow: 3 }}>
            {isMyself && <ProfileEditForm profile={profile} />}

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{ px: 2, py: 2, bgcolor: 'background.default' }}
            >
              <Box maxWidth="sm" alignItems="center" justifyContent="center">
                <Avatar
                  aria-label="avatar"
                  src={profile.avatar || '/default-avatar.png'}
                  alt="avatar"
                  sx={{ width: 150, height: 150, marginBottom: 4 }}
                />
                <Typography variant="h6" fontWeight={700} align="center">
                  {profile.name}
                </Typography>
                <Typography variant="body1" align="center" component="div" gutterBottom>
                  <Chip sx={{ mt: 2, mb: 2 }} label={profile.status} />
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ borderBottomWidth: 2 }} />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{ px: 2, py: 4, bgcolor: 'background.default' }}
            >
              <Box maxWidth="sm">
                <Typography variant="body1" align="center" style={{ whiteSpace: 'pre-line' }} gutterBottom>
                  {profile.bio}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Container>
      ) : (
        <Typography align="center">Loading profile...</Typography> // Show a loading message until profile is loaded
      )}
    </div>
  );
};

export default Profile;
