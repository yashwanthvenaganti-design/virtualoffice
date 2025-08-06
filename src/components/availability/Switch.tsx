import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  icon,
  description,
  children,
}) => (
  <div className='space-y-4'>
    <div className='flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200'>
      <div className='flex items-start gap-3'>
        {icon && (
          <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600'>
            {icon}
          </div>
        )}
        <div>
          <label className='text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer'>
            {label}
          </label>
          {description && (
            <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>{description}</p>
          )}
        </div>
      </div>
      <button
        type='button'
        role='switch'
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-gray-800
          ${checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
            transition duration-200 ease-in-out
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
    {checked && children && (
      <div className='ml-4 pl-4 border-l-2 border-blue-200 dark:border-blue-800 animate-in slide-in-from-top-2 duration-200'>
        {children}
      </div>
    )}
  </div>
);

export default Switch;
