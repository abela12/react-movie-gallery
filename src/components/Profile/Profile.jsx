/* eslint-disable react/function-component-definition */
import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

import { userSelector } from '../../features/auth';

const Profile = () => {
  const { user } = useSelector(userSelector);
  console.log(user);
  const favouriteMovies = [];

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favouriteMovies.length
        ? <Typography variant="h5">Add Favourites or watchlist to see them here</Typography>
        : (
          <Box>
            Favourite Movies
          </Box>
        ) }
    </Box>
  );
};

export default Profile;
