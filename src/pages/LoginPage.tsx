import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  InputAdornment,
  IconButton,
  Alert,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Business } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../theme/ThemeContext';
import clsx from 'clsx';

export function Button({ isActive }: { isActive: boolean }) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded',
        isActive ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'
      )}
    >
      {isActive ? 'Active' : 'Inactive'}
    </button>
  );
}

interface LoginFormData {
  virtualOfficeName: string;
  username: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDark } = useTheme();

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
      if (error) setError(null);
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(formData);
      navigate('/home', { replace: true });
    } catch (err) {
      setError('Invalid credentials. Please check your details and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
  };

  return (
    <div
      className={`h-screen w-screen flex overflow-auto p-9 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
          : 'bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50'
      }`}
    >
      {/* Container for both sections */}
      <div className='flex w-full h-full'>
        {/* Left Side - Login Form with rounded container */}
        <div
          className={clsx(
            'flex-1 flex items-center justify-center rounded-3xl p-3',
            isDark
              ? 'bg-gray-800/90 backdrop-blur-xl border border-gray-700/50'
              : 'bg-white/90 backdrop-blur-xl border border-white/20'
          )}
        >
          <div className={`w-full max-w-lg p-8 rounded-3xl shadow-2xl}`}>
            {/* Logo and Header */}
            <div className='mb-8'>
              <div className='flex items-center gap-2 mb-8'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-white' : 'bg-black'
                  }`}
                >
                  <span className={`font-bold text-sm ${isDark ? 'text-black' : 'text-white'}`}>
                    V
                  </span>
                </div>
                <span
                  className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}
                >
                  Virtual Office
                </span>
              </div>

              <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Welcome Back!
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Please enter log in details below
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert
                severity='error'
                className='mb-4 rounded-lg'
                sx={{
                  backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2',
                  color: isDark ? '#f87171' : '#dc2626',
                  border: isDark ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid #fecaca',
                  '& .MuiAlert-icon': {
                    color: isDark ? '#f87171' : '#dc2626',
                  },
                }}
              >
                {error}
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Virtual Office Name Field */}
              <div>
                <TextField
                  fullWidth
                  placeholder='Virtual Office Name'
                  variant='outlined'
                  value={formData.virtualOfficeName}
                  onChange={handleInputChange('virtualOfficeName')}
                  required
                  disabled={isLoading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f8f9fa',
                      borderRadius: '12px',
                      border: 'none',
                      '& fieldset': {
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                      },
                      '&:hover fieldset': {
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: '1px solid #3b82f6',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '14px 16px',
                      fontSize: '14px',
                      color: isDark ? '#ffffff' : '#1f2937',
                      '&::placeholder': {
                        color: isDark ? '#9ca3af' : '#9ca3af',
                        opacity: 1,
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Business sx={{ color: '#9ca3af', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              {/* Username Field */}
              <div>
                <TextField
                  fullWidth
                  placeholder='Username'
                  variant='outlined'
                  value={formData.username}
                  onChange={handleInputChange('username')}
                  required
                  disabled={isLoading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f8f9fa',
                      borderRadius: '12px',
                      border: 'none',
                      '& fieldset': {
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                      },
                      '&:hover fieldset': {
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: '1px solid #3b82f6',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '14px 16px',
                      fontSize: '14px',
                      color: isDark ? '#ffffff' : '#1f2937',
                      '&::placeholder': {
                        color: isDark ? '#9ca3af' : '#9ca3af',
                        opacity: 1,
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Email sx={{ color: '#9ca3af', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              {/* Password Field */}
              <div className='relative'>
                <TextField
                  fullWidth
                  placeholder='Password'
                  type={showPassword ? 'text' : 'password'}
                  variant='outlined'
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  required
                  disabled={isLoading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f8f9fa',
                      borderRadius: '12px',
                      border: 'none',
                      '& fieldset': {
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                      },
                      '&:hover fieldset': {
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: '1px solid #3b82f6',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '14px 16px',
                      fontSize: '14px',
                      color: isDark ? '#ffffff' : '#1f2937',
                      '&::placeholder': {
                        color: isDark ? '#9ca3af' : '#9ca3af',
                        opacity: 1,
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Lock sx={{ color: '#9ca3af', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge='end'
                          size='small'
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <VisibilityOff sx={{ color: '#9ca3af', fontSize: 20 }} />
                          ) : (
                            <Visibility sx={{ color: '#9ca3af', fontSize: 20 }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              {/* Remember Me and Forgot Password */}
              <div className='flex items-center justify-between'>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.rememberMe}
                      onChange={handleInputChange('rememberMe')}
                      disabled={isLoading}
                      sx={{
                        color: '#9ca3af',
                        '&.Mui-checked': {
                          color: '#3b82f6',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label={
                    <span
                      className={`text-sm select-none ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      Remember me
                    </span>
                  }
                />

                <button
                  type='button'
                  onClick={handleForgotPassword}
                  className={`text-sm hover:underline ${
                    isDark
                      ? 'text-gray-300 hover:text-gray-100'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type='submit'
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDark
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>

              <div
                className={`text-center text-sm my-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              >
                or continue
              </div>

              {/* Google Sign In */}
              <button
                type='button'
                onClick={handleGoogleLogin}
                className={`w-full py-4 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-3 border ${
                  isDark
                    ? 'border-gray-600 bg-gray-700/50 text-gray-200 hover:bg-gray-600/50'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <svg className='w-5 h-5' viewBox='0 0 24 24'>
                  <path
                    fill='#4285F4'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  />
                  <path
                    fill='#34A853'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  />
                  <path
                    fill='#FBBC05'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  />
                  <path
                    fill='#EA4335'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  />
                </svg>
                Log in with Google
              </button>

              <div
                className={`text-center text-sm mt-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Don't have an account?{' '}
                <button
                  type='button'
                  onClick={handleSignUp}
                  className={`font-semibold hover:underline ${
                    isDark ? 'text-white' : 'text-black'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Dark Illustration with bottom-left radius only */}
          <div className='flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-9 relative overflow-hidden rounded-bl-3xl rounded-lg'>
            {/* Background geometric elements from reference */}
            <div className='absolute top-16 right-20 w-4 h-4 bg-yellow-400 transform rotate-45 opacity-80'></div>
            <div className='absolute top-32 left-16 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-green-400 opacity-60'></div>
            <div className='absolute bottom-20 left-20 w-6 h-6 rounded-full bg-green-400 opacity-70'></div>
            <div className='absolute bottom-32 right-16 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-yellow-400 opacity-50'></div>

            {/* Main content container */}
            <div className='text-center text-white relative z-10 max-w-md'>
              {/* 3D Character illustration container */}
              <div className='mb-8 relative'>
                <div className='w-80 h-80 mx-auto relative flex items-center justify-center'>
                  {/* Hexagonal background frame */}
                  <div
                    className='absolute w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30'
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }}
                  ></div>

                  {/* Character - 3D person with laptop */}
                  <div className='relative z-10'>
                    <div className='w-48 h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl relative'>
                      <div className='text-center'>
                        <div className='text-7xl mb-2'>👨‍💻</div>
                        <div className='w-20 h-12 bg-gray-300 rounded-md mx-auto opacity-80'></div>
                      </div>
                    </div>

                    {/* Floating elements */}
                    <div className='absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full animate-bounce shadow-lg'></div>
                    <div className='absolute -bottom-6 -left-6 w-10 h-10 bg-yellow-400 rounded-full opacity-80 animate-pulse shadow-lg'></div>
                  </div>
                </div>
              </div>

              {/* Text content */}
              <h2 className='text-4xl font-bold mb-4 leading-tight'>Manage your Money Anywhere</h2>
              <p className='text-lg opacity-90 mb-8 leading-relaxed'>
                you can Manage your Money on the go with Quicken on the web
              </p>

              {/* Dots pagination */}
              <div className='flex justify-center gap-2'>
                <div className='w-2 h-2 bg-white bg-opacity-30 rounded-full'></div>
                <div className='w-8 h-2 bg-white rounded-full'></div>
                <div className='w-2 h-2 bg-white bg-opacity-30 rounded-full'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
