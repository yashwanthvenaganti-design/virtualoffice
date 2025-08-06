import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, InputAdornment, Alert } from '@mui/material';
import { Business, Person, ArrowBack } from '@mui/icons-material';
import { useTheme } from '../theme/ThemeContext';
import clsx from 'clsx';
import Logo from '../components/common/Logo';
import { z } from 'zod';
import SuccessIcon from '../assets/SuccessIconProps';

interface ForgotPasswordFormData {
  virtualOfficeName: string;
  username: string;
}

const forgotPasswordSchema = z.object({
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
});

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    virtualOfficeName?: string;
    username?: string;
  }>({});
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
      forgotPasswordSchema.parse(formData);
      setFieldErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: typeof fieldErrors = {};
        err.errors.forEach(error => {
          const field = error.path[0] as keyof typeof fieldErrors;
          if (field && ['virtualOfficeName', 'username'].includes(field)) {
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
      setError('Please fix the errors below and try again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
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
      <main
        className={`min-h-screen w-full flex items-center justify-center p-3 sm:p-2 lg:p-3 xl:p-3 rounded-xl overflow-auto shadow-2xl ${
          isDark
            ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
            : 'bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50'
        }`}
      >
        {/* Main Container Card */}
        <div
          className={clsx(
            'w-full max-w-8xl h-auto min-h-[650px] flex flex-col lg:flex-row shadow-2xl rounded-xl',
            isDark
              ? 'bg-gray-800/90 backdrop-blur-xl border border-gray-700/50'
              : 'bg-white/90 backdrop-blur-xl border border-white/20'
          )}
        >
          <section
            className='flex-1 flex items-center justify-center lg:rounded-l-xl lg:rounded-tr-none px-6 sm:px-8 lg:px-8 xl:px-12 py-3'
            aria-labelledby='success-heading'
          >
            <div className='w-full max-w-md lg:max-w-lg xl:max-w-2xl'>
              {/* Header */}
              <header className='mb-1 lg:mb-1'>
                <div className='flex items-center gap-2 mb-6 lg:mb-8'>
                  <Logo />
                </div>

                <h1
                  id='success-heading'
                  className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  Reset Link Sent!
                </h1>
                <p className={`text-sm lg:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Check your email for instructions
                </p>
              </header>

              <div className='text-center mb-10'>
                <SuccessIcon
                  size='md'
                  variant='green'
                  aria-label='Password reset email sent successfully'
                />
              </div>

              <p
                className={`text-sm lg:text-base leading-relaxed mb-12 text-center ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                We've sent password reset instructions to your registered email address. Please
                check your inbox (and spam folder) and follow the instructions to reset your
                password.
              </p>

              <button
                onClick={handleBackToLogin}
                className={`w-full py-4 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isDark
                    ? 'bg-white text-black hover:bg-gray-200 focus:ring-offset-gray-800'
                    : 'bg-black text-white hover:bg-gray-800 focus:ring-offset-white'
                }`}
              >
                <ArrowBack sx={{ fontSize: 18 }} />
                Back to Sign In
              </button>
            </div>
          </section>

          {/* Right Side - Same illustration as login page */}
          <section
            className='hidden lg:flex flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 items-center justify-center m-3 p-5 relative rounded-tl-xl lg:rounded-r-xl lg:rounded-bl-[55px] lg:rounded-br-xl overflow-hidden'
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

                  {/* Character - Security focused */}
                  <div className='relative z-10'>
                    <div className='w-36 h-36 xl:w-48 xl:h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl relative'>
                      <div className='text-center'>
                        <div
                          className='text-5xl xl:text-7xl mb-2'
                          role='img'
                          aria-label='Security lock'
                        >
                          🔐
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
                Secure Access Recovery
              </h2>
              <p
                id='illustration-description'
                className='text-base xl:text-lg opacity-90 mb-8 leading-relaxed'
              >
                Your account security is our priority. We'll help you regain access safely.
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
  }

  return (
    <main
      className={clsx(
        `min-h-screen w-full flex items-center justify-center p-2 sm:p-2 lg:p-3 xl:p-3 rounded-xl overflow-auto shadow-2xl ${
          isDark
            ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
            : 'bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50'
        }`
      )}
    >
      {/* Main Container Card */}
      <div
        className={clsx(
          'w-full max-w-8xl h-auto min-h-[650px] flex flex-col lg:flex-row shadow-2xl rounded-xl',
          isDark
            ? 'bg-gray-800/90 backdrop-blur-xl border border-gray-700/50'
            : 'bg-white/90 backdrop-blur-xl border border-white/20'
        )}
      >
        {/* Left Side - Forgot Password Form */}
        <section
          className='flex-1 flex items-center justify-center lg:rounded-l-xl lg:rounded-tr-none px-6 sm:px-8 lg:px-8 xl:px-12 py-3'
          aria-labelledby='forgot-password-heading'
        >
          <div className='w-full max-w-md lg:max-w-lg xl:max-w-2xl'>
            {/* Header */}
            <header className='mb-1 lg:mb-1'>
              <div className='flex items-center gap-2 mb-6 lg:mb-3'>
                <Logo />
              </div>

              <h1
                id='forgot-password-heading'
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                Password Reset
              </h1>
              <p className={`text-sm lg:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Please enter details below to reset password
              </p>
            </header>

            {/* Error Alert */}
            {error && (
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
            )}

            {/* Forgot Password Form */}
            <form onSubmit={handleSubmit} className='space-y-6 lg:space-y-10' noValidate>
              <fieldset className='space-y-4 lg:space-y-6' disabled={isLoading}>
                <legend className='sr-only'>Password Reset Credentials</legend>

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
                    Username
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
                          <Person sx={{ color: '#9ca3af', fontSize: 20 }} aria-hidden='true' />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </fieldset>

              {/* Send Reset Link Button */}
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
                {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
              </button>
              {isLoading && (
                <span id='loading-status' className='sr-only' aria-live='polite'>
                  Please wait while we send the reset link
                </span>
              )}

              {/* Back to Login */}
              <div
                className={`text-center text-sm mt-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              >
                <button
                  type='button'
                  onClick={handleBackToLogin}
                  disabled={isLoading}
                  className={`font-semibold hover:underline focus:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDark
                      ? 'text-white focus:ring-offset-gray-800'
                      : 'text-black focus:ring-offset-white'
                  }`}
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Right Side - Same illustration structure as login page */}
        <section
          className='hidden lg:flex flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 items-center justify-center m-3 p-5 relative rounded-tl-xl lg:rounded-r-xl lg:rounded-bl-[55px] lg:rounded-br-xl overflow-hidden'
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

                {/* Character - Security focused */}
                <div className='relative z-10'>
                  <div className='w-36 h-36 xl:w-48 xl:h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl relative'>
                    <div className='text-center'>
                      <div
                        className='text-5xl xl:text-7xl mb-2'
                        role='img'
                        aria-label='Security lock'
                      >
                        🔐
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
              Secure Access Recovery
            </h2>
            <p
              id='illustration-description'
              className='text-base xl:text-lg opacity-90 mb-8 leading-relaxed'
            >
              Your account security is our priority. We'll help you regain access safely.
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

export default ForgotPasswordPage;
