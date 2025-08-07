import React, { forwardRef } from 'react';
import { ExpandMore } from '@mui/icons-material';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  error?: boolean;
  onChange?: (value: string) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, error, className, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className='relative'>
        <select
          {...props}
          ref={ref}
          onChange={handleChange}
          className={`
            w-full px-4 py-3 pr-12 text-sm
            bg-white dark:bg-gray-800
            border rounded-xl
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400
            transition-all duration-200
            appearance-none
            focus:outline-none focus:ring-4
            disabled:bg-gray-50 dark:disabled:bg-gray-700
            disabled:text-gray-500 dark:disabled:text-gray-400
            disabled:cursor-not-allowed
            ${
              error
                ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20 dark:focus:ring-red-400/20'
                : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 hover:border-gray-300 dark:hover:border-gray-600'
            }
            ${className || ''}
          `}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
          <ExpandMore
            className={`w-5 h-5 transition-colors duration-200 ${
              error ? 'text-red-400' : 'text-gray-400 dark:text-gray-500'
            }`}
          />
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
