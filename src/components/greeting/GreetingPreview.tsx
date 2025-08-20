import React from 'react';
import {
  Message,
  Person,
  CheckCircle,
  RadioButtonUnchecked,
  WavingHand,
} from '@mui/icons-material';

interface GreetingPreviewProps {
  formData: {
    name?: string;
    greeting?: string;
    salutation?: boolean;
  };
  currentStep?: number;
}

const GreetingPreview: React.FC<GreetingPreviewProps> = ({ formData, currentStep }) => {
  const getCompletionStatus = () => {
    const requiredFields = [formData.name, formData.greeting];

    const completed = requiredFields.filter(field => field && field.trim().length > 0).length;
    const total = requiredFields.length;
    const percentage = Math.round((completed / total) * 100);

    return { completed, total, percentage };
  };

  const completion = getCompletionStatus();

  const getPreviewGreeting = () => {
    if (!formData.greeting) return '';

    if (formData.salutation) {
      return `***** Good Morning/Afternoon/Evening *****\n\n${formData.greeting}`;
    }

    return formData.greeting;
  };

  return (
    <div className='sticky top-6'>
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
        {/* Header */}
        <div className='p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center'>
              <Message className='w-5 h-5 text-blue-600 dark:text-blue-400' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                What your PA sees
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                How this greeting will appear
              </p>
            </div>
          </div>

          {/* Completion Progress */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-gray-600 dark:text-gray-400'>Completion</span>
              <span className='font-medium text-gray-900 dark:text-gray-100'>
                {completion.completed}/{completion.total} fields
              </span>
            </div>
            <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
              <div
                className='bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all duration-300'
                style={{ width: `${completion.percentage}%` }}
              />
            </div>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              {completion.percentage}% complete
            </p>
          </div>
        </div>

        {/* Preview Content */}
        <div className='p-6 space-y-6'>
          {/* Profile Information */}
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Person className='w-4 h-4 text-gray-400' />
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Profile</span>
            </div>
            <div className='ml-6'>
              <div className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                {formData.name || (
                  <span className='text-gray-400 dark:text-gray-500 font-normal'>
                    Profile name...
                  </span>
                )}
              </div>
              {formData.name === 'Default' && (
                <div className='inline-flex items-center px-2 py-1 mt-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full'>
                  Default Greeting
                </div>
              )}
            </div>
          </div>

          {/* Greeting Message */}
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Message className='w-4 h-4 text-gray-400' />
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                Greeting Message
              </span>
            </div>
            <div className='ml-6'>
              {formData.greeting ? (
                <div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                  <pre className='text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap font-sans'>
                    {getPreviewGreeting()}
                  </pre>
                </div>
              ) : (
                <div className='text-sm text-gray-400 dark:text-gray-500 italic'>
                  Greeting message will appear here...
                </div>
              )}
            </div>
          </div>

          {/* Settings */}
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <WavingHand className='w-4 h-4 text-gray-400' />
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Settings</span>
            </div>
            <div className='ml-6 space-y-2'>
              <div className='flex items-center gap-2'>
                {formData.salutation ? (
                  <CheckCircle className='w-4 h-4 text-green-500' />
                ) : (
                  <RadioButtonUnchecked className='w-4 h-4 text-gray-400' />
                )}
                <span className='text-sm text-gray-600 dark:text-gray-400'>
                  Display salutation: {formData.salutation ? 'On' : 'Off'}
                </span>
              </div>

              {formData.salutation && (
                <div className='ml-6 text-xs text-gray-500 dark:text-gray-400'>
                  Your PA will include time-of-day greetings (Good Morning/Afternoon/Evening) before
                  reading your message.
                </div>
              )}
            </div>
          </div>

          {/* Character Count */}
          {/* {formData.greeting && (
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center'>
                  <span className='text-xs font-bold text-gray-600 dark:text-gray-300'>#</span>
                </div>
                <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Message Stats
                </span>
              </div>
              <div className='ml-6 space-y-1'>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  <span className='font-medium'>{formData.greeting.length}</span> characters
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  <span className='font-medium'>{formData.greeting.split(' ').length}</span> words
                </div>
                <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1'>
                  <div
                    className='bg-blue-500 h-1 rounded-full transition-all duration-300'
                    style={{ width: `${Math.min((formData.greeting.length / 500) * 100, 100)}%` }}
                  />
                </div>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  {500 - formData.greeting.length} characters remaining
                </p>
              </div>
            </div>
          )} */}
        </div>

        {/* Action Button */}
        {/* {completion.percentage === 100 && (
          <div className='p-6 bg-green-50 dark:bg-green-900/20 border-t border-green-200 dark:border-green-800'>
            <div className='flex items-center gap-2'>
              <CheckCircle className='w-5 h-5 text-green-600 dark:text-green-400' />
              <span className='text-sm font-medium text-green-900 dark:text-green-100'>
                Ready to save
              </span>
            </div>
            <p className='text-sm text-green-700 dark:text-green-300 mt-1'>
              Your greeting is complete and ready to be saved.
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default GreetingPreview;
