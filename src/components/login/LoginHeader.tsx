import React from 'react';
import Logo from '../common/Logo';

interface LoginHeaderProps {
  isDark: boolean;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ isDark }) => {
  return (
    <header className='mb-1 lg:mb-1'>
      <div className='flex items-center gap-2 mb-1 lg:mb-1'>
        <Logo />
      </div>

      <h1
        id='login-heading'
        className={`text-2xl sm:text-2xl lg:text-3xl font-bold mb-1 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        Welcome Back!
      </h1>
      <p className={`text-sm lg:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        Please enter log in details below
      </p>
    </header>
  );
};

export default LoginHeader;
