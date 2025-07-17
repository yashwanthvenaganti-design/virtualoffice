// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  FormControlLabel,
  Checkbox,
  Link,
  useTheme,
  alpha,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock, Business } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/common/Logo';

interface LoginFormData {
  virtualOfficeName: string;
  username: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    virtualOfficeName: '',
    username: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange =
    (field: keyof LoginFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      }));
      // Clear error when user starts typing
      if (error) setError(null);
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(formData);
      // Redirect to dashboard on successful login
      navigate('/home', { replace: true });
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
            <Typography variant='body1' color='text.secondary' sx={{ fontWeight: 500, mt: 2 }}>
              Log in to your virtual office
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity='error' sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
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
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                  },
                  '&.Mui-focused': {
                    backgroundColor: theme.palette.background.paper,
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
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                  },
                  '&.Mui-focused': {
                    backgroundColor: theme.palette.background.paper,
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

            <TextField
              fullWidth
              label='Password'
              type={showPassword ? 'text' : 'password'}
              variant='outlined'
              value={formData.password}
              onChange={handleInputChange('password')}
              required
              disabled={isLoading}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                  },
                  '&.Mui-focused': {
                    backgroundColor: theme.palette.background.paper,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Lock color='action' />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge='end'
                      aria-label='toggle password visibility'
                      disabled={isLoading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.rememberMe}
                  onChange={handleInputChange('rememberMe')}
                  color='primary'
                  disabled={isLoading}
                />
              }
              label='Remember me'
              sx={{ mb: 3 }}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              size='large'
              disabled={isLoading}
              sx={{
                mt: 2,
                mb: 2,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: '1.1rem',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                  transform: 'translateY(-1px)',
                },
                '&:disabled': {
                  background: theme.palette.action.disabledBackground,
                  boxShadow: 'none',
                  transform: 'none',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Link
                href='#'
                variant='body2'
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Can't access your account?
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
