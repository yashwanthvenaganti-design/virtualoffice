import React from 'react';
import { Settings, CheckCircle } from '@mui/icons-material';
import SectionHeader from './SectionHeader';

interface FormValues {
  statusName: string;
  availability: 'available' | 'unavailable';
  telNo: string;
  emailNotifications: boolean;
  emailAddress?: string;
  smsNotifications: boolean;
  smsNumber?: string;
}

interface ReviewAndSaveStepProps {
  formData: FormValues;
}

export const ReviewAndSaveStep: React.FC<ReviewAndSaveStepProps> = ({ formData }) => {
  return (
    <section aria-labelledby='review-section' className='space-y-6'>
      <SectionHeader
        icon={<Settings className='w-5 h-5' />}
        title='Review & Save'
        subtitle='Review your availability configuration before saving'
      />

      <div className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
            <h4 className='text-sm font-medium text-gray-900 dark:text-gray-100 mb-2'>
              Status Information
            </h4>
            <div className='space-y-1 text-sm text-gray-600 dark:text-gray-300'>
              <p>
                <span className='font-medium'>Name:</span> {formData.statusName}
              </p>
              <p>
                <span className='font-medium'>Status:</span>{' '}
                <span
                  className={
                    formData.availability === 'available' ? 'text-green-600' : 'text-red-600'
                  }
                >
                  {formData.availability === 'available' ? 'Available' : 'Unavailable'}
                </span>
              </p>
            </div>
          </div>

          <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
            <h4 className='text-sm font-medium text-gray-900 dark:text-gray-100 mb-2'>
              Contact Details
            </h4>
            <div className='space-y-1 text-sm text-gray-600 dark:text-gray-300'>
              <p>
                <span className='font-medium'>Phone:</span> {formData.telNo}
              </p>
            </div>
          </div>
        </div>

        <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
          <h4 className='text-sm font-medium text-gray-900 dark:text-gray-100 mb-2'>
            Notification Preferences
          </h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300'>
            <div>
              <p>
                <span className='font-medium'>Email:</span>{' '}
                {formData.emailNotifications ? (
                  <span className='text-green-600'>
                    Enabled {formData.emailAddress && `(${formData.emailAddress})`}
                  </span>
                ) : (
                  <span className='text-gray-500'>Disabled</span>
                )}
              </p>
            </div>
            <div>
              <p>
                <span className='font-medium'>SMS:</span>{' '}
                {formData.smsNotifications ? (
                  <span className='text-green-600'>
                    Enabled {formData.smsNumber && `(${formData.smsNumber})`}
                  </span>
                ) : (
                  <span className='text-gray-500'>Disabled</span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className='p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl'>
          <div className='flex items-start gap-3'>
            <div className='flex-shrink-0'>
              <div className='w-8 h-8 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center'>
                <CheckCircle className='w-4 h-4 text-green-600 dark:text-green-400' />
              </div>
            </div>
            <div>
              <h4 className='text-sm font-medium text-green-900 dark:text-green-100 mb-1'>
                Ready to Save
              </h4>
              <p className='text-sm text-green-700 dark:text-green-300'>
                Your availability configuration is complete. Review the details above and click
                "Save Changes" to apply your settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
