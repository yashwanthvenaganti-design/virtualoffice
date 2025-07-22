import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, InputAdornment, Alert } from '@mui/material';
import { Business, Person, ArrowBack } from '@mui/icons-material';
import Logo from '../components/common/Logo';

interface ForgotPasswordFormData {
  virtualOfficeName: string;
  username: string;
}

const ForgotPasswordPage: React.FC = () => {
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
      <div className='min-h-screen flex items-center justify-center bg-background p-4'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950' />

        <div className='relative z-10 w-full max-w-md'>
          <div className='card-strong text-center animate-in'>
            <Logo size='large' />

            <h1 className='text-2xl font-bold text-foreground mt-6 mb-2'>Reset Link Sent!</h1>

            <p className='text-muted mb-8 leading-relaxed'>
              We've sent password reset instructions to your registered email address. Please check
              your inbox (and spam folder) and follow the instructions to reset your password.
            </p>

            <button
              onClick={handleBackToLogin}
              className='w-full btn-primary flex items-center justify-center gap-2'
            >
              <ArrowBack sx={{ fontSize: 18 }} />
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-background p-4'>
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950' />

      <div className='absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full opacity-10 animate-float' />
      <div className='absolute bottom-32 left-10 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl opacity-10 animate-pulse-slow' />

      <div className='relative z-10 w-full max-w-md'>
        <div className='card-strong animate-in'>
          {/* Header */}
          <div className='text-center mb-8'>
            <Logo size='large' />

            <h1 className='text-3xl font-bold text-foreground mt-6 mb-2'>Password Reset</h1>

            <p className='text-muted'>Enter your details below to reset your password</p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert
              severity='error'
              className='mb-6 rounded-xl'
              sx={{
                backgroundColor: 'rgba(var(--color-error), 0.1)',
                color: 'rgb(var(--color-error))',
                border: '1px solid rgba(var(--color-error), 0.2)',
                '& .MuiAlert-icon': {
                  color: 'rgb(var(--color-error))',
                },
              }}
            >
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='virtualOfficeName'
                className='block text-sm font-medium text-foreground mb-2'
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Business className='text-muted' sx={{ fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <label htmlFor='username' className='block text-sm font-medium text-foreground mb-2'>
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Person className='text-muted' sx={{ fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus-ring'
            >
              {isLoading ? (
                <div className='flex items-center justify-center gap-3'>
                  <div className='loading-spinner' />
                  Sending Reset Link...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>

            <div className='text-center pt-4'>
              <button
                type='button'
                onClick={handleBackToLogin}
                className='text-primary-600 hover:text-primary-700 font-medium hover:underline focus-ring rounded-md px-2 py-1 text-sm'
              >
                ← Back to Sign In
              </button>
            </div>
          </form>

          <div className='mt-8 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/50'>
            <p className='text-sm text-blue-800 dark:text-blue-200'>
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
