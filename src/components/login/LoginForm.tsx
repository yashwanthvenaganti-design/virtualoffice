import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import LoginHeader from './LoginHeader';
import LoginFormFields from './LoginFormFields';
import LoginButtons from './LoginButtons';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../theme/ThemeContext';

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

const LoginForm: React.FC = () => {
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
    <section
      className='flex-1 flex items-center justify-center lg:rounded-l-xl lg:rounded-tr-none px-6 sm:px-8 lg:px-8 xl:px-12 py-3'
      aria-labelledby='login-heading'
    >
      <div className='w-full max-w-md lg:max-w-lg xl:max-w-2xl'>
        <LoginHeader isDark={isDark} />

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
        <form onSubmit={handleSubmit} className='space-y-3 lg:space-y-4' noValidate>
          <LoginFormFields
            formData={formData}
            fieldErrors={fieldErrors}
            showPassword={showPassword}
            isLoading={isLoading}
            isDark={isDark}
            error={error}
            onInputChange={handleInputChange}
            onTogglePasswordVisibility={togglePasswordVisibility}
            onForgotPassword={handleForgotPassword}
          />

          <LoginButtons
            isLoading={isLoading}
            isDark={isDark}
            onGoogleLogin={handleGoogleLogin}
            onSignUp={handleSignUp}
          />
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
