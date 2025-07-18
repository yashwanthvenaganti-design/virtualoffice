import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Link,
  useTheme,
  alpha,
  InputAdornment,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Business, Person, ArrowBack } from '@mui/icons-material';
import Logo from '../components/common/Logo';

interface ForgotPasswordFormData {
  virtualOfficeName: string;
  username: string;
}

const ForgotPasswordPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    virtualOfficeName: '',
    username: '',
  });

  const handleInputChange =
    (field: keyof ForgotPasswordFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value,
      }));
      // Clear error when user starts typing
      if (error) setError(null);
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would typically call your password reset API
      // await resetPassword(formData);

      setSuccess(true);
    } catch (err) {
      setError('Unable to reset password. Please check your details and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (success) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, 
            ${alpha(theme.palette.primary.main, 0.1)} 0%, 
            ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Container maxWidth='sm'>
          <Paper
            elevation={0}
            sx={{
              p: 6,
              borderRadius: 4,
              background: `linear-gradient(135deg, 
                ${alpha(theme.palette.background.paper, 0.95)} 0%, 
                ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
              textAlign: 'center',
            }}
          >
            <Logo size='large' />
            <Typography variant='h5' sx={{ mt: 3, mb: 2, fontWeight: 600 }}>
              Reset Link Sent!
            </Typography>
            <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
              We've sent password reset instructions to your registered email address. Please check
              your inbox and follow the instructions to reset your password.
            </Typography>
            <Button
              variant='contained'
              onClick={handleBackToLogin}
              startIcon={<ArrowBack />}
              sx={{
                mt: 2,
                py: 1.5,
                px: 4,
                borderRadius: 2,
                fontWeight: 600,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Back to Login
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.primary.main, 0.1)} 0%, 
          ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth='sm'>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            borderRadius: 4,
            background: `linear-gradient(135deg, 
              ${alpha(theme.palette.background.paper, 0.95)} 0%, 
              ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
          }}
        >
          {/* Logo Section */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Logo size='large' />
            <Typography
              variant='h5'
              sx={{
                mt: 3,
                mb: 1,
                fontWeight: 600,
                color: theme.palette.error.main,
              }}
            >
              FORGOT DETAILS
            </Typography>
            <Typography variant='body1' color='text.secondary' sx={{ fontWeight: 500 }}>
              Please enter your details to reset your password.
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity='error' sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Forgot Password Form */}
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label='Virtual Office Name'
              variant='outlined'
              value={formData.virtualOfficeName}
              onChange={handleInputChange('virtualOfficeName')}
              required
              disabled={isLoading}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  outline: 'none',
                  boxShadow: 'none',
                  '&:focus': {
                    outline: 'none',
                    boxShadow: 'none',
                  },
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                  },
                  '&.Mui-focused': {
                    backgroundColor: theme.palette.background.paper,
                    outline: 'none',
                    boxShadow: 'none',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  outline: 'none',
                  boxShadow: 'none',
                  '&:focus': {
                    outline: 'none',
                    boxShadow: 'none',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Business color='action' />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label='Username'
              variant='outlined'
              value={formData.username}
              onChange={handleInputChange('username')}
              required
              disabled={isLoading}
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  outline: 'none',
                  boxShadow: 'none',
                  '&:focus': {
                    outline: 'none',
                    boxShadow: 'none',
                  },
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                  },
                  '&.Mui-focused': {
                    backgroundColor: theme.palette.background.paper,
                    outline: 'none',
                    boxShadow: 'none',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  outline: 'none',
                  boxShadow: 'none',
                  '&:focus': {
                    outline: 'none',
                    boxShadow: 'none',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Person color='action' />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              size='large'
              disabled={isLoading}
              sx={{
                mt: 2,
                mb: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: '1.1rem',
                backgroundColor: theme.palette.info.main,
                '&:hover': {
                  backgroundColor: theme.palette.info.dark,
                  transform: 'translateY(-1px)',
                },
                '&:disabled': {
                  background: theme.palette.action.disabledBackground,
                  transform: 'none',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color='inherit' />
                  Sending Reset Link...
                </Box>
              ) : (
                'Reset password'
              )}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link
                component='button'
                type='button'
                variant='body2'
                onClick={handleBackToLogin}
                sx={{
                  color: theme.palette.error.main,
                  textDecoration: 'none',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Remembered your login? Click here
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;
