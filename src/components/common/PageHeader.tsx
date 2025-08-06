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
      className='relative flex-shrink-0 px-8 py-6 border-b border-gray-200/60 bg-gradient-to-r from-white via-white/95 to-gray-50/80 dark:border-gray-700/60 dark:from-gray-800 dark:via-gray-800/95 dark:to-gray-900/80 backdrop-blur-md'
      role='banner'
    >
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.02] dark:to-white/[0.02] pointer-events-none' />

      <div className='relative flex items-start gap-5'>
        <div
          className='flex-shrink-0 p-3.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-200/30 shadow-lg shadow-blue-500/10 dark:from-blue-400/10 dark:to-indigo-500/10 dark:border-blue-400/20 dark:shadow-blue-400/10'
          aria-hidden='true'
        >
          <Icon className='w-7 h-7 text-blue-600 dark:text-blue-400 drop-shadow-sm' />
        </div>

        <div className='flex-1 min-w-0 pt-1'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2 leading-tight'>
            {title}
          </h1>
          {description && (
            <p className='text-base leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl font-medium'>
              {description}
            </p>
          )}
        </div>
      </div>

      <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent' />
    </header>
  );
};

export default PageHeader;
