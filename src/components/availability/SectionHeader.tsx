import React from 'react';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, subtitle }) => (
  <div className='flex items-center gap-3 mb-6'>
    <div className='flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'>
      {icon}
    </div>
    <div>
      <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>{title}</h2>
      {subtitle && <p className='text-sm text-gray-500 dark:text-gray-400'>{subtitle}</p>}
    </div>
  </div>
);

export default SectionHeader;
