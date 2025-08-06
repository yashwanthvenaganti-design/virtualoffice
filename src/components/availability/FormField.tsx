import React from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, htmlFor, required, error, children }) => (
  <div className='space-y-2'>
    <label htmlFor={htmlFor} className='block text-sm font-medium text-gray-900 dark:text-gray-100'>
      {label} {required && <span className='text-red-500'>*</span>}
    </label>
    {children}
    {error && (
      <p className='text-sm text-red-600 dark:text-red-400 flex items-center gap-1'>
        <CancelOutlinedIcon fontSize='small' />
        {error}
      </p>
    )}
  </div>
);

export default FormField;
