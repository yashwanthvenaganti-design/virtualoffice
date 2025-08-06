import React from 'react';
import { CheckCircle, Cancel, Phone, Email, Sms, Visibility } from '@mui/icons-material';

import type { FormValues } from './types';

interface AvailabilityPreviewProps {
  formData: FormValues;
}

import SectionHeader from './SectionHeader';

interface AvailabilityPreviewProps {
  formData: FormValues;
}

const AvailabilityPreview: React.FC<AvailabilityPreviewProps> = ({ formData }) => (
  <div className='sticky top-8'>
    <SectionHeader
      icon={<Visibility className='w-5 h-5' />}
      title='Preview'
      subtitle='How your availability appears'
    />

    <div className='bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl'>
      <div className='space-y-4'>
        {/* Header */}
        <div className='flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700'>
          <div>
            <h3 className='font-semibold text-gray-900 dark:text-gray-100'>John Doe</h3>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              {formData.statusName || 'Status Name'}
            </p>
          </div>
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              formData.availability === 'available'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            }`}
          >
            {formData.availability === 'available' ? (
              <CheckCircle className='w-4 h-4' />
            ) : (
              <Cancel className='w-4 h-4' />
            )}
            {formData.availability === 'available' ? 'Available' : 'Unavailable'}
          </div>
        </div>

        {/* Contact Info */}
        <div className='space-y-3'>
          <div className='flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300'>
            <Phone className='w-4 h-4 text-blue-500' />
            <span>{formData.telNo || 'No phone number'}</span>
          </div>

          <div className='flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300'>
            <Email
              className={`w-4 h-4 ${
                formData.emailNotifications ? 'text-blue-500' : 'text-gray-400'
              }`}
            />
            <span>
              {formData.emailNotifications && formData.emailAddress
                ? formData.emailAddress
                : 'Email notifications disabled'}
            </span>
          </div>

          <div className='flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300'>
            <Sms
              className={`w-4 h-4 ${
                formData.smsNotifications ? 'text-green-500' : 'text-gray-400'
              }`}
            />
            <span>
              {formData.smsNotifications && formData.smsNumber
                ? formData.smsNumber
                : 'SMS notifications disabled'}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AvailabilityPreview;
