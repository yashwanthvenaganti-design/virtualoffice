import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { ArrowBack, Person, Message } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import FormStepper, { type StepDefinition } from '../addresses/FormStepper';
import FormAlerts from '../addresses/FormAlerts';
import FormNavigation from '../addresses/FormNavigation';
import GreetingPreview from './GreetingPreview';
import {
  BasicInformationStep,
  GreetingContentStep,
  type GreetingStepComponentProps,
} from './GreetingFormStepComponents';
import toast from 'react-hot-toast';

import { useGreeting, useCreateGreeting, useUpdateGreeting } from '../../hooks/useGreeting';
import type { GreetingFormData, GreetingItem } from '../../types/greeting';

const COMPANIES_ID = import.meta.env.VITE_APP_COMPANIES_ID;

const formSchema = z.object({
  name: z.string().trim().min(1, 'Profile name is required'),
  greeting: z.string().trim().min(1, 'Greeting message is required'),
  salutation: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const steps: StepDefinition[] = [
  { id: 'basic', label: 'Profile Information', icon: <Person className='w-4 h-4' /> },
  { id: 'greeting', label: 'Greeting Content', icon: <Message className='w-4 h-4' /> },
];

const GreetingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = id !== 'new';

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Check if greeting data was passed via navigation state
  const greetingFromState = location.state?.greeting as GreetingItem | undefined;

  const [formData, setFormData] = useState<FormValues>({
    name: '',
    greeting: '',
    salutation: true,
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  // Fetch greeting data if editing and not passed via state
  const {
    data: greetingData,
    isLoading: isLoadingGreeting,
    error: greetingError,
  } = useGreeting(id || '', COMPANIES_ID, {
    enabled: isEdit && !greetingFromState && !!id && id !== 'new',
    onError: error => {
      console.error('Failed to fetch greeting:', error);
      toast.error('Failed to load greeting data');
    },
  });

  // Create mutation
  const createMutation = useCreateGreeting({
    onSuccess: data => {
      setSaveSuccess(true);
      toast.success('Greeting created successfully!');
      setTimeout(() => {
        navigate('/greetings', {
          state: { refreshData: true, message: 'Greeting created successfully!' },
        });
      }, 1500);
    },
    onError: error => {
      console.error('Failed to create greeting:', error);
      setError('Failed to create greeting. Please try again.');
      toast.error('Failed to create greeting');
    },
  });

  // Update mutation
  const updateMutation = useUpdateGreeting({
    onSuccess: data => {
      setSaveSuccess(true);
      toast.success('Greeting updated successfully!');
      setTimeout(() => {
        navigate('/greetings', {
          state: { refreshData: true, message: 'Greeting updated successfully!' },
        });
      }, 1500);
    },
    onError: error => {
      console.error('Failed to update greeting:', error);
      setError('Failed to update greeting. Please try again.');
      toast.error('Failed to update greeting');
    },
  });

  // Populate form data when greeting is loaded
  useEffect(() => {
    const greetingToLoad = greetingFromState || greetingData;

    if (greetingToLoad) {
      setFormData({
        name: greetingToLoad.name || '',
        greeting: greetingToLoad.greeting || '',
        salutation: greetingToLoad.salutation ?? true,
      });
    }
  }, [greetingFromState, greetingData]);

  const handleInputChange =
    (field: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        event.target.type === 'checkbox'
          ? (event.target as HTMLInputElement).checked
          : event.target.value;

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

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  };

  const getFieldsForStep = (stepIndex: number): (keyof FormValues)[] => {
    switch (stepIndex) {
      case 0:
        return ['name'];
      case 1:
        return ['greeting'];
      default:
        return [];
    }
  };

  const validateStepFields = (stepIndex: number): boolean => {
    const fieldsToValidate = getFieldsForStep(stepIndex);

    if (fieldsToValidate.length === 0) return true;

    try {
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
    const fieldsForStep = getFieldsForStep(stepIndex);

    if (fieldsForStep.length === 0) return true;

    return fieldsForStep.every(field => {
      const value = formData[field];
      const hasValue = typeof value === 'string' ? value.trim().length > 0 : Boolean(value);
      const hasNoError = !fieldErrors[field];
      return hasValue && hasNoError;
    });
  };

  const handleNext = () => {
    if (validateStepFields(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepErrors = (stepIndex: number) => {
    const fieldsForStep = getFieldsForStep(stepIndex);
    return fieldsForStep.some(field => fieldErrors[field]);
  };

  const canProceedToNext = () => {
    const fieldsForStep = getFieldsForStep(currentStep);

    if (fieldsForStep.length === 0) return true;

    return fieldsForStep.every(field => {
      const value = formData[field];
      const hasValue = typeof value === 'string' ? value.trim().length > 0 : Boolean(value);
      return hasValue;
    });
  };

  const handleSaveClick = async () => {
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
      const submitData: GreetingFormData = {
        name: formData.name,
        greeting: formData.greeting,
        salutation: formData.salutation,
      };

      if (isEdit && id) {
        await updateMutation.mutateAsync({ id, data: submitData });
      } else {
        await createMutation.mutateAsync(submitData);
      }
    } catch (error) {
      // Error handling is done in mutation callbacks
    } finally {
      setSaving(false);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleBack = () => {
    navigate('/greetings');
  };

  const renderStepContent = () => {
    const stepProps: GreetingStepComponentProps = {
      formData,
      fieldErrors,
      handleInputChange,
      handleKeyPress,
    };

    switch (currentStep) {
      case 0:
        return <BasicInformationStep {...stepProps} />;
      case 1:
        return <GreetingContentStep {...stepProps} />;
      default:
        return null;
    }
  };

  // Show loading state
  if (isLoadingGreeting) {
    return (
      <div className='flex items-center justify-center min-h-[300px]'>
        <div className='text-center space-y-4'>
          <CircularProgress />
          <p className='text-sm text-gray-600 dark:text-gray-400'>Loading greeting data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (greetingError) {
    return (
      <div className='flex items-center justify-center min-h-[300px]'>
        <div className='text-center space-y-4'>
          <h3 className='text-lg font-semibold text-red-600 dark:text-red-400'>
            Failed to Load Greeting
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            {greetingError.message || 'There was an error loading the greeting data.'}
          </p>
          <button
            onClick={handleBack}
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
          >
            Back to Greetings
          </button>
        </div>
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
              aria-label='Go back to greetings list'
            >
              <ArrowBack className='w-5 h-5' />
            </button>
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
                {isEdit ? 'Edit Greeting' : 'Add New Greeting'}
              </h1>
              <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                {isEdit
                  ? 'Update greeting profile and message'
                  : 'Create a new greeting with profile name and message'}
              </p>
            </div>
          </div>

          {/* Progress Stepper */}
          <FormStepper
            steps={steps}
            activeStep={currentStep}
            isStepComplete={isStepComplete}
            getStepErrors={getStepErrors}
          />

          {/* Alerts */}
          <FormAlerts error={error} saveSuccess={saveSuccess} />
        </header>

        <form onSubmit={onSubmit} className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Form */}
          <div className='lg:col-span-2'>
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 min-h-[400px]'>
              {renderStepContent()}

              {/* Navigation Buttons */}
              <FormNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                saving={saving}
                canProceedToNext={canProceedToNext()}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onCancel={handleBack}
                onSave={handleSaveClick}
              />
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className='lg:col-span-1'>
            <GreetingPreview formData={formData} currentStep={currentStep} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GreetingDetailPage;
