import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { CircularProgress } from '@mui/material';

import PageHeader from './PageHeader';
import AvailabilityPreview from './AvailabilityPreview';
import AlertMessages from './AlertMessages';
import StepContent from './StepContentProps';
import NavigationButtons from './NavigationButtons';
import ProgressStepper from './ProgressStepper';

import {
  useAvailability,
  useUpdateAvailability,
  useCreateAvailability,
} from '../../hooks/useAvailability';
import type { AvailabilityFormData } from '../../types/availability';

// Updated form schema to match API structure
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

const PEOPLE_ID = import.meta.env.VITE_APP_PEOPLE_ID;

const AvailabilityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  // React Query hooks for data fetching and mutations
  const {
    data: availability,
    isLoading: isLoadingAvailability,
    error: fetchError,
    refetch: refetchAvailability,
  } = useAvailability(id || '', PEOPLE_ID, {
    enabled: isEditing, // Only fetch if we're editing an existing item
    onError: error => {
      console.error('Failed to fetch availability:', error);
      setError(`Failed to load availability: ${error.message}`);
    },
  });

  // Mutation for updating existing availability
  const updateMutation = useUpdateAvailability({
    onSuccess: data => {
      console.log('✅ Successfully updated availability:', data);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    },
    onError: error => {
      console.error('❌ Failed to update availability:', error);
      setError(`Failed to update availability: ${error.message}`);
    },
  });

  // Mutation for creating new availability
  const createMutation = useCreateAvailability({
    onMutate: variables => {
      console.log('🚀 Creating new availability:', variables);
    },
    onSuccess: data => {
      console.log('✅ Successfully created availability:', data);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        navigate('/availability'); // Navigate back to list after successful creation
      }, 2000);
    },
    onError: error => {
      console.error('❌ Failed to create availability:', error);
      setError(`Failed to create availability: ${error.message}`);
    },
  });

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
    if (availability && isEditing) {
      console.log('📝 Populating form with existing data:', availability);
      setFormData({
        statusName: availability.name || '',
        availability: availability.available ? 'available' : 'unavailable',
        telNo: availability.telNo || '',
        emailNotifications: availability.email,
        emailAddress: availability.emailAddr || '',
        smsNotifications: availability.sms,
        smsNumber: availability.smsNo || '',
      });
    }
  }, [availability, isEditing]);

  // Clear error when fetch error changes
  useEffect(() => {
    if (fetchError) {
      setError(`Failed to load availability: ${fetchError.message}`);
    }
  }, [fetchError]);

  const handleInputChange =
    (field: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const target = event.target as HTMLInputElement;
      let value: any;

      if (target.type === 'checkbox') {
        value = target.checked;
      } else if (target.type === 'radio') {
        value = target.value;
      } else {
        value = target.value;
      }

      console.log(`📝 Form field changed: ${field} = ${value}`);

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
      console.log(`📝 Switch changed: ${field} = ${checked}`);
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
      console.log('⚠️ Form submitted on non-final step, ignoring');
      return;
    }

    if (!validateForm()) {
      setError('Please fix the errors above and try again.');
      return;
    }

    console.log('🚀 Submitting form:', { isEditing, formData });
    setError(null);

    try {
      // Convert form data to API format
      const submitData: AvailabilityFormData = {
        name: formData.statusName,
        available: formData.availability === 'available',
        availability: formData.availability === 'available' ? 'Available' : 'Unavailable',
        telNo: formData.telNo,
        telNoAlt: '', // Optional field
        email: formData.emailNotifications,
        emailAddr: formData.emailNotifications ? formData.emailAddress || '' : '',
        sms: formData.smsNotifications,
        smsNo: formData.smsNotifications ? formData.smsNumber || '' : '',
        instruction: '', // Optional field
        star: false, // Default value
      };

      if (isEditing && id) {
        // Update existing availability
        console.log('🔄 Updating existing availability:', submitData);
        await updateMutation.mutateAsync({
          id,
          data: submitData,
        });
      } else {
        // Create new availability
        console.log('➕ Creating new availability:', submitData);
        await createMutation.mutateAsync(submitData);
      }
    } catch (error) {
      // Error handling is done in the mutation callbacks
      console.error('💥 Form submission error:', error);
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
      // Additional custom validation
      const validationData = { ...formData };

      // If email notifications are enabled, email address is required
      if (
        formData.emailNotifications &&
        (!formData.emailAddress || formData.emailAddress.trim() === '')
      ) {
        setFieldErrors(prev => ({
          ...prev,
          emailAddress: 'Email address is required when email notifications are enabled',
        }));
        return false;
      }

      formSchema.parse(validationData);
      setFieldErrors({});
      console.log('✅ Form validation passed');
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
        console.log('❌ Form validation failed:', errors);
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
    return isStepComplete(currentStep);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setError(null);
      console.log(`➡️ Moving to step ${currentStep + 1}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError(null);
      console.log(`⬅️ Moving to step ${currentStep - 1}`);
    }
  };

  const getStepErrors = (stepIndex: number) => {
    const fieldsForStep = getFieldsForStep(stepIndex);
    return fieldsForStep.some(field => fieldErrors[field]);
  };

  const handleBack = () => {
    navigate('/availability');
  };

  // Retry loading availability (for error states)
  const handleRetry = () => {
    if (isEditing) {
      console.log('🔄 Retrying to fetch availability');
      refetchAvailability();
    }
    setError(null);
  };

  // Loading state - show spinner while fetching data
  if (isEditing && isLoadingAvailability) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] space-y-4'>
        <CircularProgress size={48} />
        <div className='text-center'>
          <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
            Loading availability...
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
            Please wait while we fetch the availability details.
          </p>
        </div>
      </div>
    );
  }

  // Error state - show error message with retry option
  if (isEditing && fetchError && !availability) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] space-y-4'>
        <div className='text-center'>
          <h2 className='text-xl font-semibold text-red-600 dark:text-red-400 mb-2'>
            Failed to Load Availability
          </h2>
          <p className='text-gray-600 dark:text-gray-400 mb-4 max-w-md'>
            {fetchError.message || 'There was an error loading the availability details.'}
          </p>
          <div className='flex gap-3 justify-center'>
            <button
              onClick={handleRetry}
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
            >
              Try Again
            </button>
            <button
              onClick={handleBack}
              className='px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Not found state - item doesn't exist
  if (isEditing && !isLoadingAvailability && !availability && !fetchError) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] space-y-4'>
        <div className='text-center'>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2'>
            Availability Not Found
          </h2>
          <p className='text-gray-600 dark:text-gray-400 mb-4'>
            The availability you're looking for doesn't exist or may have been deleted.
          </p>
          <button
            onClick={handleBack}
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  // Check if any mutation is in progress
  const saving = updateMutation.isPending || createMutation.isPending;

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-8xl mx-auto px-4 sm:px-5 lg:px-6 py-4'>
        <PageHeader
          onBack={handleBack}
          title={isEditing ? 'Edit Availability' : 'Create Availability'}
          subtitle={
            isEditing
              ? 'Update your availability status and notification preferences'
              : 'Configure your availability status and notification preferences'
          }
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
