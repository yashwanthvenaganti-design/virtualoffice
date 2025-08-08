import React from 'react';
import { ArrowBack } from '@mui/icons-material';

interface PageHeaderProps {
  onBack: () => void;
  title: string;
  subtitle: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ onBack, title, subtitle }) => {
  return (
    <header className='mb-8'>
      <div className='flex items-center gap-4 mb-6'>
        <button
          onClick={onBack}
          className='flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md'
          aria-label='Go back to availability list'
        >
          <ArrowBack className='w-5 h-5' />
        </button>
        <div>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
            {title}
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>{subtitle}</p>
        </div>
      </div>
    </header>
  );
};
