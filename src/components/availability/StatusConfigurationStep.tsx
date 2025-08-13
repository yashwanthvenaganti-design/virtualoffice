import React from 'react';
import { Person, CheckCircle, Cancel } from '@mui/icons-material';
import SectionHeader from './SectionHeader';
import FormField from './FormField';
import Input from './Input';

interface FormValues {
  statusName: string;
  availability: 'available' | 'unavailable';
  telNo: string;
  emailNotifications: boolean;
  emailAddress?: string;
  smsNotifications: boolean;
  smsNumber?: string;
  unavailableReason?: string;
}

interface StatusConfigurationStepProps {
  formData: FormValues;
  fieldErrors: Partial<Record<keyof FormValues, string>>;
  onInputChange: (
    field: keyof FormValues
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
}

const StatusConfigurationStep: React.FC<StatusConfigurationStepProps> = ({
  formData,
  fieldErrors,
  onInputChange,
  onKeyPress,
}) => {
  return (
    <section aria-labelledby='status-section' className='space-y-6'>
      <SectionHeader
        icon={<Person className='w-5 h-5' />}
        title='Status Configuration'
        subtitle='Set your current availability status and identifier'
      />

      <div className='space-y-6'>
        <FormField label='Status Name' htmlFor='statusName' required error={fieldErrors.statusName}>
          <Input
            id='statusName'
            value={formData.statusName}
            onChange={onInputChange('statusName')}
            onKeyDown={onKeyPress}
            placeholder='Enter your status name'
            error={!!fieldErrors.statusName}
            autoFocus
          />
        </FormField>

        <div className='space-y-4'>
          <label className='block text-sm font-medium text-gray-900 dark:text-gray-100'>
            Availability Status <span className='text-red-500'>*</span>
          </label>
          <div className='grid grid-cols-2 gap-4'>
            <label
              className={`
                relative flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all duration-200
                ${
                  formData.availability === 'available'
                    ? 'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              <input
                type='radio'
                name='availability'
                value='available'
                checked={formData.availability === 'available'}
                onChange={onInputChange('availability')}
                className='sr-only'
              />
              <CheckCircle
                className={`w-5 h-5 ${
                  formData.availability === 'available' ? 'text-green-600' : 'text-gray-400'
                }`}
              />
              <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                Available
              </span>
              {formData.availability === 'available' && (
                <div className='absolute inset-0 border-2 border-green-500 rounded-xl pointer-events-none' />
              )}
            </label>

            <label
              className={`
                relative flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all duration-200
                ${
                  formData?.availability === 'unavailable'
                    ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              <input
                type='radio'
                name='availability'
                value='unavailable'
                checked={formData.availability === 'unavailable'}
                onChange={onInputChange('availability')}
                className='sr-only'
              />
              <Cancel
                className={`w-5 h-5 ${
                  formData.availability === 'unavailable' ? 'text-red-600' : 'text-gray-400'
                }`}
              />
              <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                Unavailable
              </span>
              {formData.availability === 'unavailable' && (
                <div className='absolute inset-0 border-2 border-red-500 rounded-xl pointer-events-none' />
              )}
            </label>
          </div>
        </div>

        {formData.availability === 'unavailable' && (
          <FormField
            label='Reason for Unavailability'
            htmlFor='unavailableReason'
            required
            error={fieldErrors.unavailableReason}
          >
            <Input
              id='unavailableReason'
              value={formData.unavailableReason}
              onChange={onInputChange('unavailableReason')}
              onKeyDown={onKeyPress}
              placeholder='Enter reason for unavailability'
              error={!!fieldErrors.unavailableReason}
              autoFocus
            />
          </FormField>
        )}
      </div>
    </section>
  );
};

export default StatusConfigurationStep;
