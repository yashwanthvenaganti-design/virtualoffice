import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Chip,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import {
  Email as EmailIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';

const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant='h6'>User not found</Typography>
      </Box>
    );
  }

  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return theme.palette.error.main;
      case 'user':
        return theme.palette.primary.main;
      case 'guest':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleIcon = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return <AdminIcon />;
      case 'user':
        return <PersonIcon />;
      case 'guest':
        return <PersonIcon />;
      default:
        return <PersonIcon />;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              textAlign: 'center',
              p: 3,
              background: `linear-gradient(135deg, 
                ${alpha(theme.palette.primary.main, 0.1)} 0%, 
                ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                backgroundColor: theme.palette.primary.main,
                fontSize: '2rem',
                fontWeight: 600,
              }}
            >
              {getInitials(user.username)}
            </Avatar>

            <Typography variant='h5' gutterBottom>
              {user.username}
            </Typography>

            <Chip
              icon={getRoleIcon(user?.role ?? '')}
              label={user?.role?.toUpperCase()}
              sx={{
                backgroundColor: alpha(getRoleColor(user?.role), 0.1),
                color: getRoleColor(user.role),
                fontWeight: 600,
                '& .MuiChip-icon': {
                  color: getRoleColor(user.role),
                },
              }}
            />
          </Card>
        </Grid>

        {/* Profile Information */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Profile Information
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PersonIcon color='action' />
                  <Box>
                    <Typography variant='body2' color='text.secondary'>
                      Username
                    </Typography>
                    <Typography variant='body1'>{user.username}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <EmailIcon color='action' />
                  <Box>
                    <Typography variant='body2' color='text.secondary'>
                      Email
                    </Typography>
                    <Typography variant='body1'>{user.email}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <BusinessIcon color='action' />
                  <Box>
                    <Typography variant='body2' color='text.secondary'>
                      Virtual Office
                    </Typography>
                    <Typography variant='body1'>{user.virtualOfficeName}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {getRoleIcon(user.role)}
                  <Box>
                    <Typography variant='body2' color='text.secondary'>
                      Role
                    </Typography>
                    <Typography variant='body1' sx={{ textTransform: 'capitalize' }}>
                      {user.role}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
