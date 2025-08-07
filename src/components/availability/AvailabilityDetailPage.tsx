import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
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
  Settings,
} from '@mui/icons-material';
import { CircularProgress, Stepper, Step, StepLabel } from '@mui/material';

import FormField from './FormField';
import Input from './Input';
import Switch from './Switch';
import SectionHeader from './SectionHeader';
import AvailabilityPreview from './AvailabilityPreview';

const formSchema = z.object({
  statusName: z.string().trim().min(1, 'Status name is required'),
  availability: z.enum(['available', 'unavailable']),
  telNo: z.string().trim().min(8, 'Invalid phone number'),
  emailNotifications: z.boolean(),
  emailAddress: z.union([z.string().email('Invalid email address'), z.literal('')]).optional(),
  smsNotifications: z.boolean(),
  smsNumber: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const steps = [
  { id: 'status', label: 'Status Configuration', icon: <Person className='w-4 h-4' /> },
  { id: 'contact', label: 'Contact Details', icon: <Phone className='w-4 h-4' /> },
  { id: 'notifications', label: 'Notifications', icon: <Notifications className='w-4 h-4' /> },
  { id: 'review', label: 'Review & Save', icon: <Settings className='w-4 h-4' /> },
];

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
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormValues>({
    statusName: '',
    availability: 'available',
    telNo: '',
    emailNotifications: true,
    emailAddress: '',
    smsNotifications: true,
    smsNumber: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = availabilityData.find(item => item.id === Number(id));
      if (found) {
        setFormData({
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
  }, [id]);

  const handleInputChange =
    (field: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.type === 'radio' ? event.target.value : event.target.value;
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));

      // Clear errors when user starts typing
      if (error) setError(null);
      if (fieldErrors[field]) {
        setFieldErrors(prev => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const handleSwitchChange =
    (field: 'emailNotifications' | 'smsNotifications') => (checked: boolean) => {
      setFormData(prev => ({
        ...prev,
        [field]: checked,
      }));
    };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentStep !== steps.length - 1) {
      return;
    }

    if (!validateForm()) {
      setError('Please fix the errors above and try again.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      console.log('Saving availability:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving availability:', error);
      setError('Failed to save availability. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getFieldsForStep = (stepIndex: number): (keyof FormValues)[] => {
    switch (stepIndex) {
      case 0:
        return ['statusName', 'availability'];
      case 1:
        return ['telNo'];
      case 2:
        return ['emailNotifications', 'emailAddress', 'smsNotifications', 'smsNumber'];
      case 3:
        return [];
      default:
        return [];
    }
  };

  const validateStepFields = (stepIndex: number): boolean => {
    const fieldsToValidate = getFieldsForStep(stepIndex);

    if (fieldsToValidate.length === 0) return true;

    try {
      // Create a schema with only the fields for this step
      const stepSchema = z.object(
        fieldsToValidate.reduce((acc, field) => {
          const originalField = formSchema.shape[field];
          if (originalField) {
            acc[field] = originalField;
          }
          return acc;
        }, {} as any)
      );

      const dataToValidate = fieldsToValidate.reduce((acc, field) => {
        acc[field] = formData[field];
        return acc;
      }, {} as any);

      stepSchema.parse(dataToValidate);

      // Clear errors for this step
      const clearedErrors = { ...fieldErrors };
      fieldsToValidate.forEach(field => {
        delete clearedErrors[field];
      });
      setFieldErrors(clearedErrors);

      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: typeof fieldErrors = { ...fieldErrors };
        err.errors.forEach(error => {
          const field = error.path[0] as keyof FormValues;
          if (field && fieldsToValidate.includes(field)) {
            errors[field] = error.message;
          }
        });
        setFieldErrors(errors);
      }
      return false;
    }
  };

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setFieldErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: typeof fieldErrors = {};
        err.errors.forEach(error => {
          const field = error.path[0] as keyof FormValues;
          if (field) {
            errors[field] = error.message;
          }
        });
        setFieldErrors(errors);
      }
      return false;
    }
  };

  const isStepComplete = (stepIndex: number) => {
    // For step 0 (status configuration)
    if (stepIndex === 0) {
      return formData.statusName && formData.statusName.trim().length > 0;
    }

    // For step 1 (contact details)
    if (stepIndex === 1) {
      return formData.telNo && formData.telNo.trim().length >= 8;
    }

    // For step 2 (notifications)
    if (stepIndex === 2) {
      // If email notifications are enabled, email must be valid
      if (formData.emailNotifications) {
        if (!formData.emailAddress || formData.emailAddress.trim().length === 0) {
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.emailAddress)) {
          return false;
        }
      }
      return true;
    }

    // For step 3 (review)
    if (stepIndex === 3) return true;

    return false;
  };

  const canProceedToNext = () => {
    // For step 0 (status configuration)
    if (currentStep === 0) {
      return formData.statusName && formData.statusName.trim().length > 0;
    }

    // For step 1 (contact details)
    if (currentStep === 1) {
      return formData.telNo && formData.telNo.trim().length >= 8;
    }

    // For step 2 (notifications)
    if (currentStep === 2) {
      // If email notifications are enabled, check if email is provided and valid
      if (formData.emailNotifications) {
        if (!formData.emailAddress || formData.emailAddress.trim().length === 0) {
          return false;
        }
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.emailAddress)) {
          return false;
        }
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setError(null);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const getStepErrors = (stepIndex: number) => {
    const fieldsForStep = getFieldsForStep(stepIndex);
    return fieldsForStep.some(field => fieldErrors[field]);
  };

  const handleBack = () => {
    navigate('/availability');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <section aria-labelledby='status-section' className='space-y-6'>
            <SectionHeader
              icon={<Person className='w-5 h-5' />}
              title='Status Configuration'
              subtitle='Set your current availability status and identifier'
            />

            <div className='space-y-6'>
              <FormField
                label='Status Name'
                htmlFor='statusName'
                required
                error={fieldErrors.statusName}
              >
                <Input
                  id='statusName'
                  value={formData.statusName}
                  onChange={handleInputChange('statusName')}
                  onKeyDown={handleKeyPress}
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
                      onChange={handleInputChange('availability')}
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
                        formData.availability === 'unavailable'
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
                      onChange={handleInputChange('availability')}
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
            </div>
          </section>
        );

      case 1:
        return (
          <section aria-labelledby='contact-section' className='space-y-6'>
            <SectionHeader
              icon={<Phone className='w-5 h-5' />}
              title='Contact Details'
              subtitle='Enter your primary contact information'
            />

            <div className='space-y-6'>
              <FormField
                label='Telephone Number'
                htmlFor='telNo'
                required
                error={fieldErrors.telNo}
              >
                <Input
                  id='telNo'
                  type='tel'
                  value={formData.telNo}
                  onChange={handleInputChange('telNo')}
                  onKeyDown={handleKeyPress}
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
                      This will be your main contact number for availability-related communications.
                      Make sure it's a number where you can be easily reached.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 2:
        return (
          <section aria-labelledby='notifications-section' className='space-y-6'>
            <SectionHeader
              icon={<Notifications className='w-5 h-5' />}
              title='Notification Preferences'
              subtitle='Configure how you want to receive notifications'
            />

            <div className='space-y-6'>
              <Switch
                checked={formData.emailNotifications}
                onChange={handleSwitchChange('emailNotifications')}
                label='Email Notifications'
                description='Receive notifications via email'
                icon={<Email className='w-4 h-4 text-blue-500' />}
              >
                {formData.emailNotifications && (
                  <FormField
                    label='Email Address'
                    htmlFor='emailAddress'
                    error={fieldErrors.emailAddress}
                  >
                    <Input
                      id='emailAddress'
                      type='email'
                      value={formData.emailAddress || ''}
                      onChange={handleInputChange('emailAddress')}
                      onKeyDown={handleKeyPress}
                      placeholder='john.doe@example.com'
                      error={!!fieldErrors.emailAddress}
                    />
                  </FormField>
                )}
              </Switch>

              <Switch
                checked={formData.smsNotifications}
                onChange={handleSwitchChange('smsNotifications')}
                label='SMS Notifications'
                description='Receive notifications via text message'
                icon={<Sms className='w-4 h-4 text-green-500' />}
              >
                {formData.smsNotifications && (
                  <FormField label='SMS Number' htmlFor='smsNumber'>
                    <Input
                      id='smsNumber'
                      type='tel'
                      value={formData.smsNumber || ''}
                      onChange={handleInputChange('smsNumber')}
                      onKeyDown={handleKeyPress}
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
                      You can enable or disable notifications at any time. If you enable a
                      notification type, make sure to provide valid contact information to receive
                      alerts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 3:
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
                      Your availability configuration is complete. Review the details above and
                      click "Save Changes" to apply your settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[300px]'>
        <CircularProgress />
      </div>
    );
  }

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

          {/* Progress Stepper */}
          <div className='mb-6'>
            <Stepper
              activeStep={currentStep}
              alternativeLabel
              className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'
            >
              {steps.map((step, index) => (
                <Step key={step.id}>
                  <StepLabel
                    error={getStepErrors(index)}
                    icon={
                      <div
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                          ${
                            currentStep === index
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                              : isStepComplete(index)
                                ? 'bg-green-600 text-white'
                                : getStepErrors(index)
                                  ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                                  : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                          }
                        `}
                      >
                        {isStepComplete(index) && currentStep !== index ? (
                          <CheckCircle className='w-4 h-4' />
                        ) : (
                          step.icon
                        )}
                      </div>
                    }
                  >
                    <span
                      className={`
                        text-sm font-medium
                        ${
                          currentStep >= index
                            ? 'text-gray-900 dark:text-gray-100'
                            : 'text-gray-500 dark:text-gray-400'
                        }
                      `}
                    >
                      {step.label}
                    </span>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>

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

        <form onSubmit={onSubmit} className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Form */}
          <div className='lg:col-span-2'>
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 min-h-[600px]'>
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className='flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-gray-200 dark:border-gray-700'>
                <div className='flex gap-4 flex-1'>
                  <button
                    type='button'
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className='flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none'
                  >
                    Previous
                  </button>

                  {currentStep < steps.length - 1 ? (
                    <button
                      type='button'
                      onClick={handleNext}
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
                  onClick={handleBack}
                  className='px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className='lg:col-span-1'>
            <AvailabilityPreview formData={formData} currentStep={currentStep} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AvailabilityDetailPage;
