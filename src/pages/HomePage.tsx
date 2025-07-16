import React from 'react';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  Chip,
  Avatar,
  Stack,
  Fade,
  Slide,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Home as HomeIcon,
  Business,
  Group,
  Settings,
  ArrowForward,
  Star,
  Security,
  Speed,
  TrendingUp,
  People,
  Timeline,
} from '@mui/icons-material';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => {
  const theme = useTheme();

  return (
    <Slide direction='up' in timeout={500 + delay}>
      <Card
        sx={{
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
          },
        }}
      >
        <CardContent sx={{ textAlign: 'center', p: 4 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              mb: 3,
              mx: 'auto',
              boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            {icon}
          </Box>

          <Typography
            variant='h6'
            component='h3'
            sx={{
              fontWeight: 600,
              mb: 2,
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant='body2'
            sx={{
              color: theme.palette.text.secondary,
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Slide>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, delay = 0 }) => {
  const theme = useTheme();

  return (
    <Fade in timeout={800 + delay}>
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.palette.primary.main,
            mb: 2,
            mx: 'auto',
          }}
        >
          {icon}
        </Box>

        <Typography
          variant='h3'
          component='div'
          sx={{
            fontWeight: 700,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          {value}
        </Typography>

        <Typography
          variant='body2'
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Fade>
  );
};

const HomePage: React.FC = () => {
  const theme = useTheme();

  const features: FeatureCardProps[] = [
    {
      icon: <Business sx={{ fontSize: 32 }} />,
      title: 'Virtual Workspaces',
      description:
        "Create beautiful, customizable virtual office spaces that adapt to your team's unique workflow and culture.",
      delay: 0,
    },
    {
      icon: <Group sx={{ fontSize: 32 }} />,
      title: 'Team Collaboration',
      description:
        'Seamlessly collaborate with real-time chat, video calls, and shared whiteboards in an intuitive environment.',
      delay: 100,
    },
    {
      icon: <Settings sx={{ fontSize: 32 }} />,
      title: 'Smart Automation',
      description:
        "Intelligent tools that learn from your team's patterns to optimize productivity and reduce repetitive tasks.",
      delay: 200,
    },
  ];

  const stats: StatCardProps[] = [
    {
      icon: <People sx={{ fontSize: 24 }} />,
      value: '10,000+',
      label: 'Active Users',
      delay: 0,
    },
    {
      icon: <Business sx={{ fontSize: 24 }} />,
      value: '500+',
      label: 'Companies',
      delay: 100,
    },
    {
      icon: <Timeline sx={{ fontSize: 24 }} />,
      value: '99.9%',
      label: 'Uptime',
      delay: 200,
    },
  ];

  return (
    <Container maxWidth='lg' sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 12 }}>
        <Fade in timeout={600}>
          <Box sx={{ position: 'relative', mb: 6 }}>
            {/* Glowing background */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.2)})`,
                filter: 'blur(20px)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />

            {/* Icon container */}
            <Box
              sx={{
                position: 'relative',
                width: 96,
                height: 96,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                mx: 'auto',
                boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.4)}`,
              }}
            >
              <HomeIcon sx={{ fontSize: 48 }} />
            </Box>
          </Box>
        </Fade>

        <Slide direction='up' in timeout={800}>
          <Box sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
            <Typography
              variant='h2'
              component='h1'
              sx={{
                fontWeight: 700,
                mb: 3,
                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.text.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome to Virtual Office
            </Typography>

            <Typography
              variant='h5'
              component='p'
              sx={{
                mb: 4,
                color: theme.palette.text.secondary,
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Your modern workspace solution for seamless remote collaboration
            </Typography>

            <Stack direction='row' spacing={2} justifyContent='center' sx={{ mb: 4 }}>
              <Chip label='New Features' color='primary' size='small' sx={{ fontWeight: 600 }} />
              <Chip label='Free Trial' variant='outlined' size='small' sx={{ fontWeight: 600 }} />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent='center'>
              <Button
                variant='contained'
                size='large'
                endIcon={<ArrowForward />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  },
                }}
              >
                Get Started Free
              </Button>

              <Button
                variant='outlined'
                size='large'
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  },
                }}
              >
                Watch Demo
              </Button>
            </Stack>
          </Box>
        </Slide>
      </Box>

      {/* Features Section */}
      <Box sx={{ mb: 12 }}>
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant='h3'
              component='h2'
              sx={{
                fontWeight: 700,
                mb: 2,
                color: theme.palette.text.primary,
              }}
            >
              Powerful Features
            </Typography>
            <Typography
              variant='h6'
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 400,
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Everything you need to create the perfect virtual workspace for your team
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Stats Section */}
      <Fade in timeout={1200}>
        <Card
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <CardContent sx={{ p: 6 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant='h4'
                component='h3'
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: theme.palette.text.primary,
                }}
              >
                Trusted by Teams Worldwide
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  color: theme.palette.text.secondary,
                  maxWidth: 500,
                  mx: 'auto',
                }}
              >
                Join thousands of teams already transforming their remote work experience
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <StatCard {...stat} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Fade>

      {/* Call to Action */}
      <Slide direction='up' in timeout={1400}>
        <Box sx={{ textAlign: 'center', mt: 12 }}>
          <Card
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Background decoration */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: alpha('#ffffff', 0.1),
                filter: 'blur(40px)',
              }}
            />

            <CardContent sx={{ position: 'relative', p: 6 }}>
              <Typography
                variant='h4'
                component='h3'
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Ready to Transform Your Workspace?
              </Typography>

              <Typography
                variant='h6'
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontWeight: 400,
                }}
              >
                Start your free trial today and experience the future of remote collaboration
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent='center'>
                <Button
                  variant='contained'
                  size='large'
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    backgroundColor: 'white',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: alpha('#ffffff', 0.9),
                    },
                  }}
                >
                  Start Free Trial
                </Button>

                <Button
                  variant='outlined'
                  size='large'
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: alpha('#ffffff', 0.1),
                    },
                  }}
                >
                  Contact Sales
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Slide>
    </Container>
  );
};

export default HomePage;
