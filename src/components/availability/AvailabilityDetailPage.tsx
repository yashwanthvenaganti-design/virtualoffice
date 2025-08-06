import React, { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowBack,
  Phone,
  Email,
  Sms,
  CheckCircle,
  Cancel,
  Person,
  Notifications,
  Save,
} from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

import FormField from './FormField';
import Input from './Input';
import Switch from './Switch';
import SectionHeader from './SectionHeader';
import AvailabilityPreview from './AvailabilityPreview';

const formSchema = z.object({
  statusName: z.string().min(1, 'Status name is required'),
  availability: z.enum(['available', 'unavailable']),
  telNo: z.string().min(8, 'Invalid phone number'),
  emailNotifications: z.boolean(),
  emailAddress: z.string().email({ message: 'Invalid email address' }).optional().or(z.literal('')),
  smsNotifications: z.boolean(),
  smsNumber: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const availabilityData = [
  {
    id: 1,
    name: 'Available - Morning',
    availability: '08:00 AM - 12:00 PM',
    tel: '+1 234 567 890',
    email: 'morning@example.com',
    sms: 'Enabled',
  },
  {
    id: 2,
    name: 'Available - Evening',
    availability: '05:00 PM - 09:00 PM',
    tel: '+1 987 654 321',
    email: 'evening@example.com',
    sms: 'Disabled',
  },
];

const AvailabilityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      statusName: '',
      availability: 'available',
      telNo: '',
      emailNotifications: true,
      emailAddress: '',
      smsNotifications: true,
      smsNumber: '',
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = availabilityData.find(item => item.id === Number(id));
      if (found) {
        reset({
          statusName: found.name,
          availability: found.name.toLowerCase().includes('available')
            ? 'available'
            : 'unavailable',
          telNo: found.tel,
          emailNotifications: !!found.email,
          emailAddress: found.email || '',
          smsNotifications: found.sms === 'Enabled',
          smsNumber: found.sms === 'Enabled' ? found.tel : '',
        });
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id, reset]);

  const onSubmit: SubmitHandler<FormValues> = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[300px]'>
        <CircularProgress />
      </div>
    );
  }

  const handleBack = () => {
    navigate('/availability');
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-8xl mx-auto px-4 sm:px-5 lg:px-6 py-4'>
        {/* Header */}
        <header className='mb-8'>
          <div className='flex items-center gap-4 mb-6'>
            <button
              onClick={handleBack}
              className='flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md'
              aria-label='Go back to availability list'
            >
              <ArrowBack className='w-5 h-5' />
            </button>
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
                Manage Availability
              </h1>
              <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                Configure your availability status and notification preferences
              </p>
            </div>
          </div>

          {saveSuccess && (
            <div
              className='flex items-center gap-2 p-4 mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300'
              role='alert'
              aria-live='polite'
            >
              <CheckCircle className='w-5 h-5 text-green-600 dark:text-green-400' />
              <span className='font-medium'>Changes saved successfully!</span>
            </div>
          )}
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Form */}
          <div className='lg:col-span-2 space-y-10'>
            {/* Status Configuration */}
            <section aria-labelledby='status-section'>
              <SectionHeader
                icon={<Person className='w-5 h-5' />}
                title='Status Configuration'
                subtitle='Set your current status information'
              />

              <div className='space-y-6'>
                <FormField
                  label='Status Name'
                  htmlFor='statusName'
                  required
                  error={errors.statusName?.message}
                >
                  <Input
                    {...register('statusName')}
                    id='statusName'
                    placeholder='Enter your status name'
                    error={!!errors.statusName}
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
                        watchedValues.availability === 'available'
                          ? 'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                      }
                    `}
                    >
                      <input
                        {...register('availability')}
                        type='radio'
                        value='available'
                        className='sr-only'
                      />
                      <CheckCircle
                        className={`w-5 h-5 ${
                          watchedValues.availability === 'available'
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}
                      />
                      <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                        Available
                      </span>
                      {watchedValues.availability === 'available' && (
                        <div className='absolute inset-0 border-2 border-green-500 rounded-xl pointer-events-none' />
                      )}
                    </label>

                    <label
                      className={`
                      relative flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all duration-200
                      ${
                        watchedValues.availability === 'unavailable'
                          ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                      }
                    `}
                    >
                      <input
                        {...register('availability')}
                        type='radio'
                        value='unavailable'
                        className='sr-only'
                      />
                      <Cancel
                        className={`w-5 h-5 ${
                          watchedValues.availability === 'unavailable'
                            ? 'text-red-600'
                            : 'text-gray-400'
                        }`}
                      />
                      <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                        Unavailable
                      </span>
                      {watchedValues.availability === 'unavailable' && (
                        <div className='absolute inset-0 border-2 border-red-500 rounded-xl pointer-events-none' />
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Details */}
            <section aria-labelledby='contact-section'>
              <SectionHeader
                icon={<Phone className='w-5 h-5' />}
                title='Contact Details'
                subtitle='Primary contact information'
              />

              <FormField
                label='Telephone Number'
                htmlFor='telNo'
                required
                error={errors.telNo?.message}
              >
                <Input
                  {...register('telNo')}
                  id='telNo'
                  type='tel'
                  placeholder='+1 (555) 123-4567'
                  error={!!errors.telNo}
                />
              </FormField>
            </section>

            {/* Notifications */}
            <section aria-labelledby='notifications-section'>
              <SectionHeader
                icon={<Notifications className='w-5 h-5' />}
                title='Notification Preferences'
                subtitle='Configure how you want to receive notifications'
              />

              <div className='space-y-6'>
                <Switch
                  checked={watchedValues.emailNotifications}
                  onChange={checked => setValue('emailNotifications', checked)}
                  label='Email Notifications'
                  description='Receive notifications via email'
                  icon={<Email className='w-4 h-4 text-blue-500' />}
                >
                  <FormField
                    label='Email Address'
                    htmlFor='emailAddress'
                    error={errors.emailAddress?.message}
                  >
                    <Input
                      {...register('emailAddress')}
                      id='emailAddress'
                      type='email'
                      placeholder='john.doe@example.com'
                      error={!!errors.emailAddress}
                    />
                  </FormField>
                </Switch>

                <Switch
                  checked={watchedValues.smsNotifications}
                  onChange={checked => setValue('smsNotifications', checked)}
                  label='SMS Notifications'
                  description='Receive notifications via text message'
                  icon={<Sms className='w-4 h-4 text-green-500' />}
                >
                  <FormField label='SMS Number' htmlFor='smsNumber'>
                    <Input
                      {...register('smsNumber')}
                      id='smsNumber'
                      type='tel'
                      placeholder='+1 (555) 123-4567'
                    />
                  </FormField>
                </Switch>
              </div>
            </section>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700'>
              <button
                type='submit'
                disabled={saving || !isDirty}
                className='flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]'
              >
                {saving ? (
                  <CircularProgress size={16} className='text-white' />
                ) : (
                  <Save className='w-4 h-4' />
                )}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>

              <button
                type='button'
                onClick={handleBack}
                className='px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]'
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className='lg:col-span-1'>
            <AvailabilityPreview formData={watchedValues} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AvailabilityDetailPage;
