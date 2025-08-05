import React from 'react';
import type { SvgIconComponent } from '@mui/icons-material';

interface PageHeaderProps {
  icon: SvgIconComponent;
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon: Icon, title, description }) => {
  return (
    <header
      className='flex-shrink-0 p-6 border-b border-gray-200 bg-white/80 dark:border-gray-700 dark:bg-gray-800/50 backdrop-blur-sm'
      role='banner'
    >
      <div className='flex items-center gap-4 mb-1'>
        <div
          className='p-3 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400'
          aria-hidden='true'
        >
          <Icon className='w-6 h-6' />
        </div>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>{title}</h1>
          {description && <p className='text-sm text-gray-600 dark:text-gray-400'>{description}</p>}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
