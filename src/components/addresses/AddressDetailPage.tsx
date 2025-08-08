import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { ArrowBack, Person, LocationOn, ContactPhone, Business } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import AddressPreview from './AddressPreview';
import FormStepper, { type StepDefinition } from './FormStepper';
import FormAlerts from './FormAlerts';
import FormNavigation from './FormNavigation';
import {
  BasicInformationStep,
  AddressDetailsStep,
  ContactDetailsStep,
  AdditionalInformationStep,
  type FormValues,
  type StepComponentProps,
} from './FormStepComponents';

const formSchema = z.object({
  // Basic Information
  name: z.string().trim().min(1, 'Name is required'),
  description: z.string().trim().min(1, 'Description is required'),

  // Address Details
  addressLine1: z.string().trim().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  town: z.string().trim().min(1, 'Town is required'),
  county: z.string().optional(),
  postcode: z.string().trim().min(1, 'Postcode is required'),
  country: z.string().min(1, 'Country is required'),

  // Contact Details
  telAreaCode: z.string().trim().min(1, 'Area code is required'),
  telNo: z.string().trim().min(1, 'Telephone number is required'),
  alternateTelNo: z.string().optional(),
  faxNo: z.string().optional(),
  emailAddress: z.union([z.string().email('Invalid email address'), z.literal('')]).optional(),

  // Additional
  landmark: z.string().optional(),
});

const steps: StepDefinition[] = [
  { id: 'basic', label: 'Basic Information', icon: <Person className='w-4 h-4' /> },
  { id: 'address', label: 'Address Details', icon: <LocationOn className='w-4 h-4' /> },
  { id: 'contact', label: 'Contact Details', icon: <ContactPhone className='w-4 h-4' /> },
  { id: 'additional', label: 'Additional Info', icon: <Business className='w-4 h-4' /> },
];

const countryOptions = [
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
];

const addressData: Record<string, FormValues> = {
  '1': {
    name: 'Primary address',
    description: 'Main company address',
    addressLine1: '123 Main Street',
    addressLine2: 'Suite 400',
    addressLine3: 'District',
    town: 'London',
    county: 'Greater London',
    postcode: 'AB12CD',
    country: 'GB',
    telAreaCode: '0161',
    telNo: 'adpcx_dev',
    alternateTelNo: '',
    faxNo: '',
    emailAddress: '',
    landmark: 'test',
  },
};

const AddressDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id !== 'new';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormValues>({
    name: '',
    description: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    town: '',
    county: '',
    postcode: '',
    country: 'GB',
    telAreaCode: '',
    telNo: '',
    alternateTelNo: '',
    faxNo: '',
    emailAddress: '',
    landmark: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isEdit && id && addressData[id]) {
        const found = addressData[id];
        setFormData(found);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id, isEdit]);

  const handleInputChange =
    (field: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value,
      }));

      // Clear errors when user starts typing - like your LoginForm
      if (error) setError(null);
      if (fieldErrors[field]) {
        setFieldErrors(prev => ({
          ...prev,
          [field]: undefined,
        }));
      }
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
      console.log('Saving address:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        // navigate('/addresses');
      }, 2000);
    } catch (error) {
      console.error('Error saving address:', error);
      setError('Failed to save address. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getFieldsForStep = (stepIndex: number): (keyof FormValues)[] => {
    switch (stepIndex) {
      case 0:
        return ['name', 'description'];
      case 1:
        return ['addressLine1', 'town', 'postcode', 'country'];
      case 2:
        return ['telAreaCode', 'telNo'];
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

  const handleBack = () => {
    navigate('/addresses');
  };

  const renderStepContent = () => {
    const stepProps: StepComponentProps = {
      formData,
      fieldErrors,
      handleInputChange,
      handleKeyPress,
      countryOptions,
    };

    switch (currentStep) {
      case 0:
        return <BasicInformationStep {...stepProps} />;
      case 1:
        return <AddressDetailsStep {...stepProps} />;
      case 2:
        return <ContactDetailsStep {...stepProps} />;
      case 3:
        return <AdditionalInformationStep {...stepProps} />;
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
              aria-label='Go back to address list'
            >
              <ArrowBack className='w-5 h-5' />
            </button>
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
                {isEdit ? 'Edit Address' : 'Add New Address'}
              </h1>
              <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                {isEdit
                  ? 'Update address details and contact information'
                  : 'Create a new address with complete details'}
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
              />
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className='lg:col-span-1'>
            <AddressPreview formData={formData} currentStep={currentStep} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressDetailPage;
