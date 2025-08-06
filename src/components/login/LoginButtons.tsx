import React from 'react';
import GoogleIcon from '../../assets/GoogleIcon';

interface LoginButtonsProps {
  isLoading: boolean;
  isDark: boolean;
  onGoogleLogin: () => void;
  onSignUp: () => void;
}

const LoginButtons: React.FC<LoginButtonsProps> = ({
  isLoading,
  isDark,
  onGoogleLogin,
  onSignUp,
}) => {
  return (
    <>
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
        onClick={onGoogleLogin}
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

      <div className={`text-center text-sm mt-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        Don't have an account?{' '}
        <button
          type='button'
          onClick={onSignUp}
          disabled={isLoading}
          className={`font-semibold hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded disabled:opacity-50 disabled:cursor-not-allowed ${
            isDark ? 'text-white focus:ring-offset-gray-800' : 'text-black focus:ring-offset-white'
          }`}
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

export default LoginButtons;
