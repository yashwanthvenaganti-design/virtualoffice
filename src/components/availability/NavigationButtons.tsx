import React from 'react';
import { CircularProgress } from '@mui/material';
import { Save } from '@mui/icons-material';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  canProceedToNext: () => boolean;
  saving: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onBack: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  canProceedToNext,
  saving,
  onPrevious,
  onNext,
  onBack,
}) => {
  return (
    <div className='flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-gray-200 dark:border-gray-700'>
      <div className='flex gap-4 flex-1'>
        <button
          type='button'
          onClick={onPrevious}
          disabled={currentStep === 0}
          className='flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none'
        >
          Previous
        </button>

        {currentStep < totalSteps - 1 ? (
          <button
            type='button'
            onClick={onNext}
            disabled={!canProceedToNext()}
            className='flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium text-sm rounded-md shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none'
          >
            Next
          </button>
        ) : (
          <button
            type='submit'
            disabled={saving}
            className='flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-600/30 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]'
          >
            {saving ? (
              <CircularProgress size={16} className='text-white' />
            ) : (
              <Save className='w-4 h-4' />
            )}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>

      <button
        type='button'
        onClick={onBack}
        className='px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]'
      >
        Cancel
      </button>
    </div>
  );
};

export default NavigationButtons;
