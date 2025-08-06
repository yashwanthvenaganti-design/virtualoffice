import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({ error, className = '', ...props }) => (
  <input
    className={`
      block w-full px-4 py-3 text-sm border-0 ring-1 ring-inset
      ${
        error
          ? 'ring-red-300 focus:ring-red-500 dark:ring-red-600 dark:focus:ring-red-400'
          : 'ring-gray-300 focus:ring-blue-600 dark:ring-gray-600 dark:focus:ring-blue-400'
      }
      rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
      placeholder:text-gray-400 dark:placeholder:text-gray-500
      focus:ring-2 focus:ring-inset transition-all duration-200
      shadow-sm hover:shadow-md focus:shadow-md
      ${className}
    `}
    {...props}
  />
);

export default Input;
