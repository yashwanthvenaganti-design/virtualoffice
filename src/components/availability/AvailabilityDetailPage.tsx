import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { z } from 'zod';
import toast from 'react-hot-toast';

import PageHeader from './PageHeader';
import AvailabilityPreview from './AvailabilityPreview';
import StepContent from './StepContentProps';
import NavigationButtons from './NavigationButtons';
import ProgressStepper from './ProgressStepper';

import { useUpdateAvailability, useCreateAvailability } from '../../hooks/useAvailability';
import type { AvailabilityFormData, AvailabilityItem } from '../../types/availability';

const formSchema = z
  .object({
    statusName: z.string().trim().min(1, 'Status name is required'),
    availability: z.enum(['available', 'unavailable']),
    unavailableReason: z.string().optional(),
    telNo: z.string().trim().min(8, 'Invalid phone number'),
    emailNotifications: z.boolean(),
    emailAddress: z.union([z.string().email('Invalid email address'), z.literal('')]).optional(),
    smsNotifications: z.boolean(),
    smsNumber: z.string().optional(),
  })
  .refine(
    data => {
      if (
        data.availability === 'unavailable' &&
        (!data.unavailableReason || data.unavailableReason.trim() === '')
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Reason is required when unavailable',
      path: ['unavailableReason'],
    }
  );

type FormValues = z.infer<typeof formSchema>;

const AvailabilityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const isEditing = !!id && id !== 'new';
  const availabilityData = location.state?.availability as AvailabilityItem | undefined;

  const updateMutation = useUpdateAvailability({
    onSuccess: response => {
      toast.success('Availability updated successfully!');

      setTimeout(() => {
        navigate('/availability', {
          state: {
            refreshData: true, // Signal to refresh the list
            updatedItem: response.data,
            message: response.message,
          },
          replace: true, // Use replace to prevent back button issues
        });
      }, 1000);
    },
    onError: (error: any) => {
      console.error('❌ Failed to update availability:', error);
      toast.error(error.message || 'Failed to update availability');
    },
  });

  const createMutation = useCreateAvailability({
    onMutate: variables => {
      console.log('🚀 Creating new availability:', variables);
    },
    onSuccess: response => {
      toast.success('Availability created successfully!');

      setTimeout(() => {
        navigate('/availability', {
          state: {
            refreshData: true,
            newItem: response.data,
            message: response.message,
          },
          replace: true,
        });
      }, 1000);
    },
    onError: (error: any) => {
      console.error('❌ Failed to create availability:', error);
      toast.error(error.message || 'Failed to create availability');
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormValues>({
    statusName: '',
    availability: 'available',
    unavailableReason: '',
    telNo: '',
    emailNotifications: true,
    emailAddress: '',
    smsNotifications: true,
    smsNumber: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  useEffect(() => {
    if (availabilityData && isEditing) {
      setFormData({
        statusName: availabilityData.name || '',
        availability: availabilityData.available ? 'available' : 'unavailable',
        unavailableReason: availabilityData.available ? '' : availabilityData.availability || '',
        telNo: availabilityData.telNo || '',
        emailNotifications: availabilityData.email,
        emailAddress: availabilityData.emailAddr || '',
        smsNotifications: availabilityData.sms,
        smsNumber: availabilityData.smsNo || '',
      });
    }
  }, [availabilityData, isEditing]);

  // Check if we're editing but no data was passed
  useEffect(() => {
    if (isEditing && !availabilityData) {
      toast.error('No availability data found. Please navigate from the availability list.');
    }
  }, [isEditing, availabilityData]);

  const handleInputChange =
    (field: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      let value: any;

      if (target.type === 'checkbox') {
        value = (target as HTMLInputElement).checked;
      } else if (target.type === 'radio') {
        value = target.value;
      } else {
        value = target.value;
      }

      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));

      // Clear field errors when user starts typing
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
        console.log('❌ Form validation failed:', errors);
      }
      return false;
    }
  };

  const handleSaveClick = async () => {
    if (currentStep !== 3) {
      console.log('⚠️ Save clicked but not on final step, ignoring');
      return;
    }

    if (!validateForm()) {
      toast.error('Please fix the errors and try again.');
      return;
    }

    try {
      const submitData: AvailabilityFormData = {
        name: formData.statusName,
        available: formData.availability === 'available',
        telNo: formData.telNo,
        email: formData.emailNotifications,
        emailAddr: formData.emailNotifications ? formData.emailAddress || '' : '',
        sms: formData.smsNotifications,
        smsNo: formData.smsNotifications ? formData.smsNumber || '' : '',
      };

      if (isEditing && availabilityData) {
        await updateMutation.mutateAsync({
          id: availabilityData.availabilitiesId,
          data: submitData,
        });
      } else {
        await createMutation.mutateAsync(submitData);
      }
    } catch (error: any) {
      console.error('💥 Save operation error:', error);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const getFieldsForStep = (stepIndex: number): (keyof FormValues)[] => {
    switch (stepIndex) {
      case 0:
        return ['statusName', 'availability', 'unavailableReason'];
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

  const isStepComplete = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0:
        if (!formData.statusName || formData.statusName.trim().length === 0) {
          return false;
        }
        if (formData.availability === 'unavailable') {
          return !!(formData.unavailableReason && formData.unavailableReason.trim().length > 0);
        }
        return true;
      case 1:
        return !!(formData.telNo && formData.telNo.trim().length >= 8);
      case 2:
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
      case 3:
        return true;
      default:
        return false;
    }
  };

  const canProceedToNext = (): boolean => {
    return isStepComplete(currentStep);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      console.log(`➡️ Moving to step ${currentStep + 1}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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

  if (isEditing && !availabilityData) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] space-y-4'>
        <div className='text-center'>
          <h2 className='text-xl font-semibold text-red-600 dark:text-red-400 mb-2'>
            Missing Availability Data
          </h2>
          <p className='text-gray-600 dark:text-gray-400 mb-4 max-w-md'>
            No availability data was provided. Please navigate from the availability list to edit an
            item.
          </p>
          <div className='flex gap-3 justify-center'>
            <button
              onClick={handleBack}
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
            >
              Back to List
            </button>
          </div>
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
          title={isEditing ? `Edit "${availabilityData?.name}"` : 'Create Availability'}
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
                onSave={handleSaveClick}
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
