import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { CircularProgress } from '@mui/material';

import PageHeader from './PageHeader';
import AvailabilityPreview from './AvailabilityPreview';
import { AlertMessages } from './AlertMessages';
import StepContent from './StepContentProps';
import NavigationButtons from './NavigationButtons';
import ProgressStepper from './ProgressStepper';

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
    if (currentStep !== 3) {
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

  const isStepComplete = (stepIndex: number): boolean => {
    // For step 0 (status configuration)
    if (stepIndex === 0) {
      return !!(formData.statusName && formData.statusName.trim().length > 0);
    }

    // For step 1 (contact details)
    if (stepIndex === 1) {
      return !!(formData.telNo && formData.telNo.trim().length >= 8);
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

  const canProceedToNext = (): boolean => {
    // For step 0 (status configuration)
    if (currentStep === 0) {
      return !!(formData.statusName && formData.statusName.trim().length > 0);
    }

    // For step 1 (contact details)
    if (currentStep === 1) {
      return !!(formData.telNo && formData.telNo.trim().length >= 8);
    }

    // For step 2 (notifications)
    if (currentStep === 2) {
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
    if (currentStep < 3) {
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
        <PageHeader
          onBack={handleBack}
          title='Manage Availability'
          subtitle='Configure your availability status and notification preferences'
        />

        <ProgressStepper
          currentStep={currentStep}
          isStepComplete={isStepComplete}
          getStepErrors={getStepErrors}
        />

        <AlertMessages error={error} saveSuccess={saveSuccess} />

        <form onSubmit={onSubmit} className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Form */}
          <div className='lg:col-span-2'>
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 min-h-[400px]'>
              <StepContent
                currentStep={currentStep}
                formData={formData}
                fieldErrors={fieldErrors}
                onInputChange={handleInputChange}
                onSwitchChange={handleSwitchChange}
                onKeyPress={handleKeyPress}
              />

              <NavigationButtons
                currentStep={currentStep}
                totalSteps={4}
                canProceedToNext={canProceedToNext}
                saving={saving}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onBack={handleBack}
              />
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
