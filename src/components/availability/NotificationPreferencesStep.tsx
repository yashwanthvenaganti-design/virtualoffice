import React from 'react';
import { Notifications, Email, Sms } from '@mui/icons-material';
import FormField from './FormField';
import Input from './Input';
import Switch from './Switch';
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

interface NotificationsStepProps {
  formData: FormValues;
  fieldErrors: Partial<Record<keyof FormValues, string>>;
  onInputChange: (
    field: keyof FormValues
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSwitchChange: (field: 'emailNotifications' | 'smsNotifications') => (checked: boolean) => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
}

export const NotificationsStep: React.FC<NotificationsStepProps> = ({
  formData,
  fieldErrors,
  onInputChange,
  onSwitchChange,
  onKeyPress,
}) => {
  return (
    <section aria-labelledby='notifications-section' className='space-y-6'>
      <SectionHeader
        icon={<Notifications className='w-5 h-5' />}
        title='Notification Preferences'
        subtitle='Configure how you want to receive notifications'
      />

      <div className='space-y-6'>
        <Switch
          checked={formData?.emailNotifications}
          onChange={onSwitchChange('emailNotifications')}
          label='Email Notifications'
          description='Receive notifications via email'
          icon={<Email className='w-4 h-4 text-blue-500' />}
        >
          {formData?.emailNotifications && (
            <FormField
              label='Email Address'
              htmlFor='emailAddress'
              error={fieldErrors.emailAddress}
            >
              <Input
                id='emailAddress'
                type='email'
                value={formData?.emailAddress || ''}
                onChange={onInputChange('emailAddress')}
                onKeyDown={onKeyPress}
                placeholder='john.doe@example.com'
                error={!!fieldErrors.emailAddress}
              />
            </FormField>
          )}
        </Switch>

        <Switch
          checked={formData?.smsNotifications}
          onChange={onSwitchChange('smsNotifications')}
          label='SMS Notifications'
          description='Receive notifications via text message'
          icon={<Sms className='w-4 h-4 text-green-500' />}
        >
          {formData?.smsNotifications && (
            <FormField label='SMS Number' htmlFor='smsNumber'>
              <Input
                id='smsNumber'
                type='tel'
                value={formData.smsNumber || ''}
                onChange={onInputChange('smsNumber')}
                onKeyDown={onKeyPress}
                placeholder='+1 (555) 123-4567'
              />
            </FormField>
          )}
        </Switch>

        <div className='p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl'>
          <div className='flex items-start gap-3'>
            <div className='flex-shrink-0'>
              <div className='w-8 h-8 bg-amber-100 dark:bg-amber-800 rounded-lg flex items-center justify-center'>
                <Notifications className='w-4 h-4 text-amber-600 dark:text-amber-400' />
              </div>
            </div>
            <div>
              <h4 className='text-sm font-medium text-amber-900 dark:text-amber-100 mb-1'>
                Notification Settings
              </h4>
              <p className='text-sm text-amber-700 dark:text-amber-300'>
                You can enable or disable notifications at any time. If you enable a notification
                type, make sure to provide valid contact information to receive alerts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationPreferencesStep;
