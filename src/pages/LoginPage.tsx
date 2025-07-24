import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, InputAdornment, IconButton, FormControlLabel, Checkbox } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Business } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../theme/ThemeContext';
import clsx from 'clsx';
import GoogleIcon from '../assets/GoogleIcon';
import Logo from '../components/common/Logo';
import { z } from 'zod';

export function Button({ isActive }: { isActive: boolean }) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded',
        isActive ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'
      )}
      aria-pressed={isActive}
      role='switch'
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

const loginSchema = z.object({
  virtualOfficeName: z
    .string()
    .min(1, 'Virtual Office Name is required')
    .min(2, 'Virtual Office Name must be at least 2 characters')
    .max(100, 'Virtual Office Name must be less than 100 characters'),
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
  rememberMe: z.boolean().optional(),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDark } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    virtualOfficeName?: string;
    username?: string;
    password?: string;
  }>({});
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
      // Clear errors when user starts typing
      if (error) setError(null);
      if (fieldErrors[field as keyof typeof fieldErrors]) {
        setFieldErrors(prev => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData);
      setFieldErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: typeof fieldErrors = {};
        err.errors.forEach(error => {
          const field = error.path[0] as keyof typeof fieldErrors;
          if (field && ['virtualOfficeName', 'username', 'password'].includes(field)) {
            errors[field] = error.message;
          }
        });
        setFieldErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      setError('Please fix the errors above and try again.');
      return;
    }

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main
      className={clsx(
        `min-h-screen w-full flex items-center justify-center rounded-xl overflow-auto shadow-2xl ${
          isDark
            ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
            : 'bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50'
        }`,
        error ? 'p-0 sm:p-0 lg:p-0 xl:p-0' : 'p-4 sm:p-6 lg:p-8 xl:p-8'
      )}
    >
      {/* Main Container Card */}
      <div
        className={clsx(
          'w-full max-w-7xl h-auto min-h-[600px]  flex flex-col lg:flex-row shadow-2xl rounded-xl',
          error ? 'h-[700px]' : 'h-[650px]',
          isDark
            ? 'bg-gray-800/90 backdrop-blur-xl border border-gray-700/50'
            : 'bg-white/90 backdrop-blur-xl border border-white/20'
        )}
      >
        {/* Left Side - Login Form */}
        <section
          className='flex-1 flex items-center justify-center lg:rounded-l-xl lg:rounded-tr-none p-6 sm:p-8 lg:p-8 xl:p-12'
          aria-labelledby='login-heading'
        >
          <div className='w-full max-w-md lg:max-w-lg xl:max-w-2xl'>
            {/* Header */}
            <header className='mb-4 lg:mb-3'>
              <div className='flex items-center gap-2 mb-6 lg:mb-3'>
                <Logo />
              </div>

              <h1
                id='login-heading'
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                Welcome Back!
              </h1>
              <p className={`text-sm lg:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Please enter log in details below
              </p>
            </header>

            {/* Error Alert */}
            {/* {error && (
              <div role='alert' aria-live='polite' className='mb-1 lg:mb-1'>
                <Alert
                  severity='error'
                  className='rounded-lg'
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
              </div>
            )} */}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className='space-y-4 lg:space-y-5' noValidate>
              <fieldset className='space-y-4 lg:space-y-4' disabled={isLoading}>
                <legend className='sr-only'>Login Credentials</legend>

                {/* Virtual Office Name Field */}
                <div>
                  <label htmlFor='virtualOfficeName' className='sr-only'>
                    Virtual Office Name
                  </label>
                  <TextField
                    id='virtualOfficeName'
                    name='virtualOfficeName'
                    fullWidth
                    placeholder='Virtual Office Name'
                    variant='outlined'
                    value={formData.virtualOfficeName}
                    onChange={handleInputChange('virtualOfficeName')}
                    required
                    disabled={isLoading}
                    autoComplete='organization'
                    error={!!fieldErrors.virtualOfficeName}
                    helperText={fieldErrors.virtualOfficeName}
                    aria-describedby={error ? 'error-message' : undefined}
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
                          borderWidth: '2px',
                        },
                        '&.Mui-error fieldset': {
                          border: '1px solid #dc2626',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '14px 16px',
                        fontSize: { xs: '16px', sm: '14px' },
                        color: isDark ? '#ffffff' : '#1f2937',
                        '&::placeholder': {
                          color: isDark ? '#9ca3af' : '#9ca3af',
                          opacity: 1,
                        },
                      },
                      '& .MuiFormHelperText-root': {
                        color: '#dc2626',
                        fontSize: '12px',
                        marginLeft: '8px',
                        marginTop: '4px',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Business sx={{ color: '#9ca3af', fontSize: 20 }} aria-hidden='true' />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                {/* Username Field */}
                <div>
                  <label htmlFor='username' className='sr-only'>
                    Username or Email
                  </label>
                  <TextField
                    id='username'
                    name='username'
                    fullWidth
                    placeholder='Username'
                    variant='outlined'
                    value={formData.username}
                    onChange={handleInputChange('username')}
                    required
                    disabled={isLoading}
                    autoComplete='username'
                    error={!!fieldErrors.username}
                    helperText={fieldErrors.username}
                    aria-describedby={error ? 'error-message' : undefined}
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
                          borderWidth: '2px',
                        },
                        '&.Mui-error fieldset': {
                          border: '1px solid #dc2626',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '14px 16px',
                        fontSize: { xs: '16px', sm: '14px' },
                        color: isDark ? '#ffffff' : '#1f2937',
                        '&::placeholder': {
                          color: isDark ? '#9ca3af' : '#9ca3af',
                          opacity: 1,
                        },
                      },
                      '& .MuiFormHelperText-root': {
                        color: '#dc2626',
                        fontSize: '12px',
                        marginLeft: '8px',
                        marginTop: '4px',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Email sx={{ color: '#9ca3af', fontSize: 20 }} aria-hidden='true' />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor='password' className='sr-only'>
                    Password
                  </label>
                  <TextField
                    id='password'
                    name='password'
                    fullWidth
                    placeholder='Password'
                    type={showPassword ? 'text' : 'password'}
                    variant='outlined'
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    required
                    disabled={isLoading}
                    autoComplete='current-password'
                    error={!!fieldErrors.password}
                    helperText={fieldErrors.password}
                    aria-describedby={error ? 'error-message' : 'password-visibility-toggle'}
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
                          borderWidth: '2px',
                        },
                        '&.Mui-error fieldset': {
                          border: '1px solid #dc2626',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '14px 16px',
                        fontSize: { xs: '16px', sm: '14px' },
                        color: isDark ? '#ffffff' : '#1f2937',
                        '&::placeholder': {
                          color: isDark ? '#9ca3af' : '#9ca3af',
                          opacity: 1,
                        },
                      },
                      '& .MuiFormHelperText-root': {
                        color: '#dc2626',
                        fontSize: '12px',
                        marginLeft: '8px',
                        // marginTop: '4px',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Lock sx={{ color: '#9ca3af', fontSize: 20 }} aria-hidden='true' />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge='end'
                            size='small'
                            disabled={isLoading}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            aria-describedby='password-visibility-toggle'
                            tabIndex={0}
                          >
                            {showPassword ? (
                              <VisibilityOff sx={{ color: '#9ca3af', fontSize: 20 }} />
                            ) : (
                              <Visibility sx={{ color: '#9ca3af', fontSize: 20 }} />
                            )}
                          </IconButton>
                          <span id='password-visibility-toggle' className='sr-only'>
                            Toggle password visibility
                          </span>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                {/* Remember Me and Forgot Password */}
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0'>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id='rememberMe'
                        name='rememberMe'
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
                    className={`text-sm hover:underline focus:underline focus:outline-none text-left sm:text-right ${
                      isDark
                        ? 'text-gray-300 hover:text-gray-100 focus:ring-offset-gray-800'
                        : 'text-gray-600 hover:text-gray-800 focus:ring-offset-white'
                    }`}
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                </div>
              </fieldset>

              {/* Sign In Button */}
              <button
                type='submit'
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isDark
                    ? 'bg-white text-black hover:bg-gray-200 focus:ring-offset-gray-800'
                    : 'bg-black text-white hover:bg-gray-800 focus:ring-offset-white'
                }`}
                aria-describedby={isLoading ? 'loading-status' : undefined}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
              {isLoading && (
                <span id='loading-status' className='sr-only' aria-live='polite'>
                  Please wait while we sign you in
                </span>
              )}

              <div
                className={`text-center text-sm my-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                role='separator'
                aria-label='Alternative login methods'
              >
                or continue
              </div>

              {/* Google Sign In */}
              <button
                type='button'
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-3 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDark
                    ? 'border-gray-600 bg-gray-700/50 text-gray-200 hover:bg-gray-600/50 focus:ring-offset-gray-800'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-offset-white'
                }`}
                aria-label='Log in with Google'
              >
                <GoogleIcon aria-hidden='true' />
                <span>Log in with Google</span>
              </button>

              <div
                className={`text-center text-sm mt-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Don't have an account?{' '}
                <button
                  type='button'
                  onClick={handleSignUp}
                  disabled={isLoading}
                  className={`font-semibold hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDark
                      ? 'text-white focus:ring-offset-gray-800'
                      : 'text-black focus:ring-offset-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Right Side - Illustration with bottom-left radius only */}
        <section
          className='hidden lg:flex flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 items-center justify-center m-3 p-5  relative rounded-tl-xl lg:rounded-r-xl lg:rounded-bl-[55px] lg:rounded-br-xl  overflow-hidden'
          aria-labelledby='illustration-heading'
          role='img'
          aria-describedby='illustration-description'
        >
          {/* Background geometric elements */}
          <div
            className='absolute top-16 right-20 w-4 h-4 bg-yellow-400 transform rotate-45 opacity-80'
            aria-hidden='true'
          ></div>
          <div
            className='absolute top-32 left-16 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-green-400 opacity-60'
            aria-hidden='true'
          ></div>
          <div
            className='absolute bottom-20 left-20 w-6 h-6 rounded-full bg-green-400 opacity-70'
            aria-hidden='true'
          ></div>
          <div
            className='absolute bottom-32 right-16 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-yellow-400 opacity-50'
            aria-hidden='true'
          ></div>

          {/* Main content container */}
          <div className='text-center text-white relative z-10 max-w-md xl:max-w-lg'>
            {/* 3D Character illustration container */}
            <div className='mb-8 relative' aria-hidden='true'>
              <div className='w-64 h-64 xl:w-80 xl:h-80 mx-auto relative flex items-center justify-center'>
                {/* Hexagonal background frame */}
                <div
                  className='absolute w-48 h-48 xl:w-64 xl:h-64 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30'
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                ></div>

                {/* Character - 3D person with laptop */}
                <div className='relative z-10'>
                  <div className='w-36 h-36 xl:w-48 xl:h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl relative'>
                    <div className='text-center'>
                      <div
                        className='text-5xl xl:text-7xl mb-2'
                        role='img'
                        aria-label='Person working on laptop'
                      >
                        👨‍💻
                      </div>
                      <div className='w-16 h-8 xl:w-20 xl:h-12 bg-gray-300 rounded-md mx-auto opacity-80'></div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className='absolute -top-3 -right-3 xl:-top-4 xl:-right-4 w-6 h-6 xl:w-8 xl:h-8 bg-green-400 rounded-full animate-bounce shadow-lg'></div>
                  <div className='absolute -bottom-4 -left-4 xl:-bottom-6 xl:-left-6 w-8 h-8 xl:w-10 xl:h-10 bg-yellow-400 rounded-full opacity-80 animate-pulse shadow-lg'></div>
                </div>
              </div>
            </div>

            {/* Text content */}
            <h2
              id='illustration-heading'
              className='text-3xl xl:text-4xl font-bold mb-4 leading-tight'
            >
              Manage your virtual office with alldayPA
            </h2>
            <p
              id='illustration-description'
              className='text-base xl:text-lg opacity-90 mb-8 leading-relaxed'
            >
              you can Manage your virtual office on the go with the web
            </p>

            {/* Dots pagination */}
            <nav aria-label='Illustration pagination' className='flex justify-center gap-2'>
              <div
                className='w-2 h-2 bg-white bg-opacity-30 rounded-full'
                aria-label='Page 1'
              ></div>
              <div
                className='w-8 h-2 bg-white rounded-full'
                aria-label='Current page, page 2'
              ></div>
              <div
                className='w-2 h-2 bg-white bg-opacity-30 rounded-full'
                aria-label='Page 3'
              ></div>
            </nav>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
