import React from 'react';
import { TextField, InputAdornment, IconButton, FormControlLabel, Checkbox } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Business } from '@mui/icons-material';

interface LoginFormData {
  virtualOfficeName: string;
  username: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormFieldsProps {
  formData: LoginFormData;
  fieldErrors: {
    virtualOfficeName?: string;
    username?: string;
    password?: string;
  };
  showPassword: boolean;
  isLoading: boolean;
  isDark: boolean;
  error: string | null;
  onInputChange: (
    field: keyof LoginFormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePasswordVisibility: () => void;
  onForgotPassword: () => void;
}

const LoginFormFields: React.FC<LoginFormFieldsProps> = ({
  formData,
  fieldErrors,
  showPassword,
  isLoading,
  isDark,
  error,
  onInputChange,
  onTogglePasswordVisibility,
  onForgotPassword,
}) => {
  const textFieldSx = {
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
  };

  return (
    <fieldset className='space-y-3 lg:space-y-3' disabled={isLoading}>
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
          onChange={onInputChange('virtualOfficeName')}
          required
          disabled={isLoading}
          autoComplete='organization'
          error={!!fieldErrors.virtualOfficeName}
          helperText={fieldErrors.virtualOfficeName}
          aria-describedby={error ? 'error-message' : undefined}
          sx={textFieldSx}
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
          onChange={onInputChange('username')}
          required
          disabled={isLoading}
          autoComplete='username'
          error={!!fieldErrors.username}
          helperText={fieldErrors.username}
          aria-describedby={error ? 'error-message' : undefined}
          sx={textFieldSx}
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
          onChange={onInputChange('password')}
          required
          disabled={isLoading}
          autoComplete='current-password'
          error={!!fieldErrors.password}
          helperText={fieldErrors.password}
          aria-describedby={error ? 'error-message' : 'password-visibility-toggle'}
          sx={textFieldSx}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Lock sx={{ color: '#9ca3af', fontSize: 20 }} aria-hidden='true' />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={onTogglePasswordVisibility}
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
              onChange={onInputChange('rememberMe')}
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
            <span className={`text-sm select-none ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Remember me
            </span>
          }
        />

        <button
          type='button'
          onClick={onForgotPassword}
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
  );
};

export default LoginFormFields;
