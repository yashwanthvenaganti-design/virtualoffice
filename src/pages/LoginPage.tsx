import React from 'react';
import { useTheme } from '../theme/ThemeContext';
import clsx from 'clsx';
import ErrorBoundary from '../utils/ErrorBoundary';
import LoginForm from '../components/login/LoginForm';
import LoginIllustration from '../components/login/LoginIllustration';

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

const LoginPage: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <ErrorBoundary>
      <main
        className={clsx(
          `min-h-screen w-full flex items-center justify-center rounded-xl overflow-auto shadow-2xl p-3 sm:p-2 lg:p-3 xl:p-3 ${
            isDark
              ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
              : 'bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50'
          }`
        )}
      >
        {/* Main Container Card */}
        <div
          className={clsx(
            'w-full max-w-7xl h-auto min-h-[650px] flex flex-col lg:flex-row shadow-2xl rounded-xl',
            isDark
              ? 'bg-gray-800/90 backdrop-blur-xl border border-gray-700/50'
              : 'bg-white/90 backdrop-blur-xl border border-white/20'
          )}
        >
          {/* Left Side - Login Form */}
          <LoginForm />

          {/* Right Side - Illustration */}
          <LoginIllustration />
        </div>
      </main>
    </ErrorBoundary>
  );
};

export default LoginPage;
