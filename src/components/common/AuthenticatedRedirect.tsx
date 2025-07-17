import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const AuthenticatedRedirect: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant='body2' color='text.secondary'>
          Loading...
        </Typography>
      </Box>
    );
  }

  // Redirect based on authentication status
  return isAuthenticated ? <Navigate to='/home' replace /> : <Navigate to='/login' replace />;
};

export default AuthenticatedRedirect;
