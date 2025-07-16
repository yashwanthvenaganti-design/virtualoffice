import React from 'react';
import { Container, Box, Typography, Button, Paper, Grid } from '@mui/material';
import { Home as HomeIcon, Business, Group, Settings } from '@mui/icons-material';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth='lg' className='py-8'>
      {/* Hero Section */}
      <Box className='text-center mb-12 py-16 gradient-hero rounded-2xl text-white animate-fade-in'>
        <HomeIcon sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant='h2' component='h1' gutterBottom className='font-bold'>
          Welcome to Virtual Office
        </Typography>
        <Typography variant='h5' component='p' className='mb-8 opacity-90 text-balance'>
          Your modern workspace solution for remote collaboration
        </Typography>
        <Button
          variant='contained'
          size='large'
          className='glass hover:bg-white/30 transition-all duration-300 transform hover:scale-105'
        >
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Typography
        variant='h4'
        component='h2'
        align='center'
        className='mb-8 font-bold text-gray-800'
      >
        Features
      </Typography>

      <Grid container spacing={4} className='mb-12'>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            className='p-6 text-center h-full card hover:shadow-lg transition-shadow duration-300 animate-slide-up'
          >
            <Business className='text-6xl text-primary-500 mb-4' />
            <Typography variant='h6' gutterBottom className='font-semibold text-gray-800'>
              Virtual Workspaces
            </Typography>
            <Typography variant='body2' className='text-gray-600'>
              Create and manage virtual office spaces for your team with customizable layouts and
              tools.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            className='p-6 text-center h-full card hover:shadow-lg transition-shadow duration-300 animate-slide-up'
            style={{ animationDelay: '0.1s' }}
          >
            <Group className='text-6xl text-primary-500 mb-4' />
            <Typography variant='h6' gutterBottom className='font-semibold text-gray-800'>
              Team Collaboration
            </Typography>
            <Typography variant='body2' className='text-gray-600'>
              Real-time collaboration tools including chat, video calls, and shared whiteboards.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            className='p-6 text-center h-full card hover:shadow-lg transition-shadow duration-300 animate-slide-up'
            style={{ animationDelay: '0.2s' }}
          >
            <Settings className='text-6xl text-primary-500 mb-4' />
            <Typography variant='h6' gutterBottom className='font-semibold text-gray-800'>
              Customizable Settings
            </Typography>
            <Typography variant='body2' className='text-gray-600'>
              Personalize your workspace with themes, layouts, and productivity tools.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Stats Section */}
      <Paper elevation={2} className='p-8 text-center bg-gray-50 rounded-xl'>
        <Typography variant='h5' gutterBottom className='font-bold text-gray-800 mb-6'>
          Join thousands of teams already using Virtual Office
        </Typography>
        <Grid container spacing={4} className='mt-4'>
          <Grid item xs={12} sm={4}>
            <div className='animate-fade-in'>
              <Typography variant='h4' className='font-bold text-primary-500 mb-2'>
                10,000+
              </Typography>
              <Typography variant='body1' className='text-gray-600 font-medium'>
                Active Users
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className='animate-fade-in' style={{ animationDelay: '0.1s' }}>
              <Typography variant='h4' className='font-bold text-primary-500 mb-2'>
                500+
              </Typography>
              <Typography variant='body1' className='text-gray-600 font-medium'>
                Companies
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className='animate-fade-in' style={{ animationDelay: '0.2s' }}>
              <Typography variant='h4' className='font-bold text-primary-500 mb-2'>
                99.9%
              </Typography>
              <Typography variant='body1' className='text-gray-600 font-medium'>
                Uptime
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default HomePage;
