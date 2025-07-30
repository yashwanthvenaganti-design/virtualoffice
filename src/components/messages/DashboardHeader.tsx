import React from 'react';
import MailIcon from '@mui/icons-material/Mail';

interface DashboardHeaderProps {
  isDark: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ isDark }) => {
  return (
    <header
      className={`flex-shrink-0 p-6 border-b transition-colors ${
        isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/80'
      } backdrop-blur-sm`}
      role='banner'
    >
      <div className='flex items-center gap-4 mb-6'>
        <div
          className={`p-3 rounded-xl ${
            isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-600'
          }`}
          role='img'
          aria-label='Mail icon'
        >
          <MailIcon className='w-6 h-6' />
        </div>
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Your messages
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage and organize your communications
          </p>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
