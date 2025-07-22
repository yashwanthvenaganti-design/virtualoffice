import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, InputAdornment, Alert } from '@mui/material';
import { Business, Person, ArrowBack } from '@mui/icons-material';
import { useTheme } from '../theme/ThemeContext';

interface ForgotPasswordFormData {
  virtualOfficeName: string;
  username: string;
}

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

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
      if (error) setError(null);
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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

  // Success state
  if (success) {
    return (
      <div
        className={`h-screen w-screen flex overflow-hidden ${
          isDark
            ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
            : 'bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50'
        }`}
      >
        {/* Floating background elements */}
        <div className='absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full opacity-10 animate-pulse'></div>
        <div
          className='absolute bottom-32 left-10 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl opacity-10 animate-bounce'
          style={{ animationDuration: '3s' }}
        ></div>

        <div className='flex items-center justify-center w-full h-full p-6'>
          <div
            className={`w-full max-w-md p-8 rounded-3xl shadow-2xl text-center ${
              isDark
                ? 'bg-gray-800/90 backdrop-blur-xl border border-gray-700/50'
                : 'bg-white/90 backdrop-blur-xl border border-white/20'
            }`}
          >
            {/* Logo */}
            <div className='mb-8'>
              <div className='flex items-center justify-center gap-2 mb-6'>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-white' : 'bg-black'
                  }`}
                >
                  <span className={`font-bold text-lg ${isDark ? 'text-black' : 'text-white'}`}>
                    V
                  </span>
                </div>
                <span
                  className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}
                >
                  Virtual Office
                </span>
              </div>
            </div>

            {/* Success Icon */}
            <div className='w-20 h-20 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center'>
              <svg
                className='w-10 h-10 text-green-600 dark:text-green-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 13l4 4L19 7'
                ></path>
              </svg>
            </div>

            <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Reset Link Sent!
            </h1>

            <p
              className={`text-base leading-relaxed mb-8 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              We've sent password reset instructions to your registered email address. Please check
              your inbox (and spam folder) and follow the instructions to reset your password.
            </p>

            <button
              onClick={handleBackToLogin}
              className={`w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2 ${
                isDark
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              <ArrowBack sx={{ fontSize: 18 }} />
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main forgot password form
  return (
    <div
      className={`h-screen w-screen flex overflow-hidden ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
          : 'bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50'
      }`}
    >
      {/* Floating background elements */}
      <div className='absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full opacity-10 animate-pulse'></div>
      <div
        className='absolute bottom-32 left-10 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl opacity-10 animate-bounce'
        style={{ animationDuration: '3s' }}
      ></div>
      <div
        className='absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-2xl opacity-10 animate-pulse'
        style={{ animationDelay: '1s' }}
      ></div>

      <div className='flex items-center justify-center w-full h-full p-6'>
        <div
          className={`w-full max-w-md p-8 rounded-3xl shadow-2xl ${
            isDark
              ? 'bg-gray-800/90 backdrop-blur-xl border border-gray-700/50'
              : 'bg-white/90 backdrop-blur-xl border border-white/20'
          }`}
        >
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='flex items-center justify-center gap-2 mb-6'>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-white' : 'bg-black'
                }`}
              >
                <span className={`font-bold text-sm ${isDark ? 'text-black' : 'text-white'}`}>
                  V
                </span>
              </div>
              <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Virtual Office
              </span>
            </div>

            <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Password Reset
            </h1>

            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Enter your details below to reset your password
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert
              severity='error'
              className='mb-6 rounded-xl'
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

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Virtual Office Name Field */}
            <div>
              <label
                htmlFor='virtualOfficeName'
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Virtual Office Name
              </label>
              <TextField
                id='virtualOfficeName'
                fullWidth
                variant='outlined'
                value={formData.virtualOfficeName}
                onChange={handleInputChange('virtualOfficeName')}
                required
                disabled={isLoading}
                placeholder='Enter your virtual office name'
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
                      color: '#9ca3af',
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
              <label
                htmlFor='username'
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Username
              </label>
              <TextField
                id='username'
                fullWidth
                variant='outlined'
                value={formData.username}
                onChange={handleInputChange('username')}
                required
                disabled={isLoading}
                placeholder='Enter your username'
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
                      color: '#9ca3af',
                      opacity: 1,
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Person sx={{ color: '#9ca3af', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isLoading}
              className='w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
            >
              {isLoading ? (
                <div className='flex items-center justify-center gap-3'>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Sending Reset Link...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>

            {/* Back to Login */}
            <div className='text-center pt-4'>
              <button
                type='button'
                onClick={handleBackToLogin}
                className={`font-medium hover:underline text-sm px-2 py-1 rounded-md transition-colors ${
                  isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                ← Back to Sign In
              </button>
            </div>
          </form>

          {/* Help Section */}
          <div
            className={`mt-8 p-4 rounded-xl border ${
              isDark ? 'bg-blue-950/30 border-blue-900/50' : 'bg-blue-50 border-blue-100'
            }`}
          >
            <p className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-800'}`}>
              <strong>Need help?</strong> If you're having trouble accessing your account, please
              contact your virtual office administrator or our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
