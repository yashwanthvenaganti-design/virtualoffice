import React from 'react';
import { CheckCircle } from '@mui/icons-material';

interface FormAlertsProps {
  error: string | null;
  saveSuccess: boolean;
}

const FormAlerts: React.FC<FormAlertsProps> = ({ error, saveSuccess }) => {
  if (!error && !saveSuccess) {
    return null;
  }

  return (
    <>
      {/* Error Alert */}
      {error && (
        <div
          className='flex items-center gap-2 p-4 mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl'
          role='alert'
          aria-live='polite'
        >
          <span className='font-medium'>{error}</span>
        </div>
      )}

      {/* Success Alert */}
      {saveSuccess && (
        <div
          className='flex items-center gap-2 p-4 mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300'
          role='alert'
          aria-live='polite'
        >
          <CheckCircle className='w-5 h-5 text-green-600 dark:text-green-400' />
          <span className='font-medium'>Address saved successfully!</span>
        </div>
      )}
    </>
  );
};

export default FormAlerts;
