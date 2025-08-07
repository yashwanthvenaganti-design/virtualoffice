import React from 'react';
import {
  CheckCircle,
  Cancel,
  Phone,
  Email,
  Sms,
  Visibility,
  Person,
  Notifications,
  ContactPhone,
  Settings,
  Warning,
  Info,
} from '@mui/icons-material';

import type { FormValues } from './types';
import SectionHeader from './SectionHeader';

interface AvailabilityPreviewProps {
  formData: FormValues;
  currentStep?: number;
}

const AvailabilityPreview: React.FC<AvailabilityPreviewProps> = ({ formData, currentStep = 0 }) => {
  const getStepProgress = () => {
    const steps = [
      {
        name: 'Status',
        icon: <Person className='w-4 h-4' />,
        completed: !!(formData.statusName && formData.availability),
        fields: ['statusName', 'availability'],
      },
      {
        name: 'Contact',
        icon: <ContactPhone className='w-4 h-4' />,
        completed: !!formData.telNo && formData.telNo.length >= 8,
        fields: ['telNo'],
      },
      {
        name: 'Notifications',
        icon: <Notifications className='w-4 h-4' />,
        completed: true, // Always considered complete since it's optional
        fields: ['emailNotifications', 'smsNotifications'],
      },
      {
        name: 'Complete',
        icon: <Settings className='w-4 h-4' />,
        completed: currentStep >= 3,
        fields: [],
      },
    ];

    return steps;
  };

  const getCompletionPercentage = () => {
    const steps = getStepProgress();
    const completedSteps = steps.filter(step => step.completed).length;
    return Math.round((completedSteps / steps.length) * 100);
  };

  const getPreviewMessage = () => {
    const completionPercentage = getCompletionPercentage();

    if (completionPercentage === 100) {
      return {
        type: 'success',
        icon: <CheckCircle className='w-4 h-4 text-green-600 dark:text-green-400' />,
        message: 'Configuration complete! Ready to save.',
      };
    } else if (completionPercentage >= 50) {
      return {
        type: 'progress',
        icon: <Info className='w-4 h-4 text-blue-600 dark:text-blue-400' />,
        message: 'Good progress! Complete remaining steps.',
      };
    } else {
      return {
        type: 'warning',
        icon: <Warning className='w-4 h-4 text-amber-600 dark:text-amber-400' />,
        message: 'Continue filling out the form.',
      };
    }
  };

  const previewMessage = getPreviewMessage();
  const completionPercentage = getCompletionPercentage();
  const steps = getStepProgress();

  return (
    <div className='sticky top-8 space-y-6'>
      {/* Main Preview Card */}
      <div>
        <SectionHeader
          icon={<Visibility className='w-5 h-5' />}
          title='Live Preview'
          subtitle='How your availability will appear'
        />

        <div className='bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl'>
          <div className='space-y-6'>
            {/* Progress Bar */}
            <div className='space-y-2'>
              <div className='flex items-center justify-between text-sm'>
                <span className='font-medium text-gray-700 dark:text-gray-300'>Progress</span>
                <span className='text-gray-500 dark:text-gray-400'>{completionPercentage}%</span>
              </div>
              <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                <div
                  className='bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500'
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Status Message */}
            <div
              className={`
              flex items-center gap-2 p-3 rounded-lg text-sm font-medium
              ${
                previewMessage.type === 'success'
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : previewMessage.type === 'progress'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
              }
            `}
            >
              {previewMessage.icon}
              <span>{previewMessage.message}</span>
            </div>

            {/* Profile Preview */}
            <div className='space-y-4'>
              {/* Header */}
              <div className='flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700'>
                <div>
                  <h3 className='font-semibold text-gray-900 dark:text-gray-100'>
                    {formData.statusName || (
                      <span className='text-gray-400 dark:text-gray-500 italic'>
                        Enter status name
                      </span>
                    )}
                  </h3>
                  <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                    Availability Status
                  </p>
                </div>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    formData.availability === 'available'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}
                >
                  {formData.availability === 'available' ? (
                    <CheckCircle className='w-3 h-3' />
                  ) : (
                    <Cancel className='w-3 h-3' />
                  )}
                  {formData.availability === 'available' ? 'Available' : 'Unavailable'}
                </div>
              </div>

              {/* Contact Information */}
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <div className='flex-shrink-0'>
                    <div
                      className={`
                      w-8 h-8 rounded-lg flex items-center justify-center
                      ${formData.telNo ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'}
                    `}
                    >
                      <Phone
                        className={`w-4 h-4 ${
                          formData.telNo ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                        }`}
                      />
                    </div>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
                      Primary Phone
                    </p>
                    <p className='text-sm text-gray-900 dark:text-gray-100 truncate'>
                      {formData.telNo || (
                        <span className='text-gray-400 dark:text-gray-500 italic'>
                          Enter phone number
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='flex-shrink-0'>
                    <div
                      className={`
                      w-8 h-8 rounded-lg flex items-center justify-center
                      ${formData.emailNotifications && formData.emailAddress ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'}
                    `}
                    >
                      <Email
                        className={`w-4 h-4 ${
                          formData.emailNotifications && formData.emailAddress
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-400'
                        }`}
                      />
                    </div>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
                      Email Notifications
                    </p>
                    <p className='text-sm text-gray-900 dark:text-gray-100 truncate'>
                      {formData.emailNotifications ? (
                        formData.emailAddress || (
                          <span className='text-amber-600 dark:text-amber-400'>
                            Enabled - Add email address
                          </span>
                        )
                      ) : (
                        <span className='text-gray-400 dark:text-gray-500'>Disabled</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='flex-shrink-0'>
                    <div
                      className={`
                      w-8 h-8 rounded-lg flex items-center justify-center
                      ${formData.smsNotifications ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'}
                    `}
                    >
                      <Sms
                        className={`w-4 h-4 ${
                          formData.smsNotifications
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-400'
                        }`}
                      />
                    </div>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
                      SMS Notifications
                    </p>
                    <p className='text-sm text-gray-900 dark:text-gray-100 truncate'>
                      {formData.smsNotifications ? (
                        formData.smsNumber || (
                          <span className='text-green-600 dark:text-green-400'>
                            Enabled {formData.telNo ? `(${formData.telNo})` : '- Add SMS number'}
                          </span>
                        )
                      ) : (
                        <span className='text-gray-400 dark:text-gray-500'>Disabled</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step Progress Card */}
      {/* <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm'>
        <h4 className='text-sm font-medium text-gray-900 dark:text-gray-100 mb-3'>Step Progress</h4>
        <div className='space-y-2'>
          {steps.map((step, index) => (
            <div
              key={step.name}
              className={`
                flex items-center gap-3 p-2 rounded-lg transition-all duration-200
                ${
                  index === currentStep
                    ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                    : ''
                }
              `}
            >
              <div
                className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200
                ${
                  step.completed
                    ? 'bg-green-600 text-white'
                    : index === currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                }
              `}
              >
                {step.completed && index !== currentStep ? (
                  <CheckCircle className='w-3 h-3' />
                ) : (
                  step.icon
                )}
              </div>
              <span
                className={`
                text-sm font-medium
                ${
                  index === currentStep
                    ? 'text-blue-900 dark:text-blue-100'
                    : step.completed
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-gray-500 dark:text-gray-400'
                }
              `}
              >
                {step.name}
              </span>
              {index === currentStep && (
                <span className='ml-auto text-xs text-blue-600 dark:text-blue-400 font-medium'>
                  Current
                </span>
              )}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default AvailabilityPreview;
