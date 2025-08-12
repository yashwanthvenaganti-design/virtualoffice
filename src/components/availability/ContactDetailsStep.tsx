import React from 'react';
import { Phone } from '@mui/icons-material';
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
}

interface ContactDetailsStepProps {
  formData: FormValues;
  fieldErrors: Partial<Record<keyof FormValues, string>>;
  onInputChange: (
    field: keyof FormValues
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
}

const ContactDetailsStep: React.FC<ContactDetailsStepProps> = ({
  formData,
  fieldErrors,
  onInputChange,
  onKeyPress,
}) => {
  return (
    <section aria-labelledby='contact-section' className='space-y-6'>
      <SectionHeader
        icon={<Phone className='w-5 h-5' />}
        title='Contact Details'
        subtitle='Enter your primary contact information'
      />

      <div className='space-y-6'>
        <FormField label='Telephone Number' htmlFor='telNo' required error={fieldErrors.telNo}>
          <Input
            id='telNo'
            type='tel'
            value={formData.telNo}
            onChange={onInputChange('telNo')}
            onKeyDown={onKeyPress}
            placeholder='+1 (555) 123-4567'
            error={!!fieldErrors.telNo}
            autoFocus
          />
        </FormField>

        <div className='p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl'>
          <div className='flex items-start gap-3'>
            <div className='flex-shrink-0'>
              <div className='w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center'>
                <Phone className='w-4 h-4 text-blue-600 dark:text-blue-400' />
              </div>
            </div>
            <div>
              <h4 className='text-sm font-medium text-blue-900 dark:text-blue-100 mb-1'>
                Primary Contact
              </h4>
              <p className='text-sm text-blue-700 dark:text-blue-300'>
                This will be your main contact number for availability-related communications. Make
                sure it's a number where you can be easily reached.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDetailsStep;
