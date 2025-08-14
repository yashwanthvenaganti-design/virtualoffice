import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
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
  type StepComponentProps,
} from './FormStepComponents';
import toast from 'react-hot-toast';

import {
  useAddress,
  useCreateAddress,
  useUpdateAddress,
  useCountries,
} from '../../hooks/useAddress';
import type { AddressFormData, AddressItem } from '../../types/address';

const COMPANIES_ID = import.meta.env.VITE_APP_COMPANIES_ID;

const formSchema = z.object({
  // Basic Information
  name: z.string().trim().min(1, 'Name is required'),
  description: z.string().trim().min(1, 'Description is required'),

  // Address Details
  addrLine1: z.string().trim().min(1, 'Address line 1 is required'),
  addrLine2: z.string().optional(),
  addrLine3: z.string().optional(),
  town: z.string().trim().min(1, 'Town is required'),
  county: z.string().optional(),
  postcode: z.string().trim().min(1, 'Postcode is required'),
  country: z.string().min(1, 'Country is required'),

  // Contact Details
  telPrefix: z.string().trim().min(1, 'Telephone prefix is required'),
  telNo: z.string().trim().min(1, 'Telephone number is required'),
  telNoAlt: z.string().optional(),
  faxNo: z.string().optional(),
  emailAddr: z.union([z.string().email('Invalid email address'), z.literal('')]).optional(),

  // Additional
  landmark: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const steps: StepDefinition[] = [
  { id: 'basic', label: 'Basic Information', icon: <Person className='w-4 h-4' /> },
  { id: 'address', label: 'Address Details', icon: <LocationOn className='w-4 h-4' /> },
  { id: 'contact', label: 'Contact Details', icon: <ContactPhone className='w-4 h-4' /> },
  { id: 'additional', label: 'Additional Info', icon: <Business className='w-4 h-4' /> },
];

const AddressDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = id !== 'new';

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Check if address data was passed via navigation state
  const addressFromState = location.state?.address as AddressItem | undefined;

  const [formData, setFormData] = useState<FormValues>({
    name: '',
    description: '',
    addrLine1: '',
    addrLine2: '',
    addrLine3: '',
    town: '',
    county: '',
    postcode: '',
    country: isEdit ? '' : 'GB',
    telPrefix: '',
    telNo: '',
    telNoAlt: '',
    faxNo: '',
    emailAddr: '',
    landmark: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  // Fetch address data if editing and not passed via state
  const {
    data: addressData,
    isLoading: isLoadingAddress,
    error: addressError,
  } = useAddress(id || '', COMPANIES_ID, {
    enabled: isEdit && !addressFromState,
    onError: error => {
      console.error('Failed to fetch address:', error);
      toast.error('Failed to load address data');
    },
  });

  // Fetch countries for dropdown (non-blocking)
  const {
    data: countriesResponse,
    isLoading: isLoadingCountries,
    error: countriesError,
  } = useCountries({
    onError: error => {
      console.error('Failed to fetch countries:', error);
      // Don't show error toast for countries as it's not critical
    },
  });

  // Create mutation
  const createMutation = useCreateAddress({
    onSuccess: data => {
      setSaveSuccess(true);
      toast.success('Address created successfully!');
      setTimeout(() => {
        navigate('/addresses', {
          state: { refreshData: true, message: 'Address created successfully!' },
        });
      }, 1500);
    },
    onError: error => {
      console.error('Failed to create address:', error);
      setError('Failed to create address. Please try again.');
      toast.error('Failed to create address');
    },
  });

  // Update mutation
  const updateMutation = useUpdateAddress({
    onSuccess: data => {
      setSaveSuccess(true);
      toast.success('Address updated successfully!');
      setTimeout(() => {
        navigate('/addresses', {
          state: { refreshData: true, message: 'Address updated successfully!' },
        });
      }, 1500);
    },
    onError: error => {
      console.error('Failed to update address:', error);
      setError('Failed to update address. Please try again.');
      toast.error('Failed to update address');
    },
  });

  // Country options from API or fallback
  const countryOptions = useMemo(() => {
    if (countriesResponse && countriesResponse?.data?.length > 0) {
      const validCountries = countriesResponse?.data?.filter(
        country =>
          country &&
          typeof country.iso === 'string' &&
          typeof country.printableName === 'string' &&
          country.iso.trim() !== '' &&
          country.printableName.trim() !== ''
      );

      const options = validCountries?.map(country => ({
        value: country.iso.trim(),
        label: country.printableName.trim(),
      }));

      return options;
    }

    // Fallback countries if API fails
    const fallbackOptions = [
      { value: 'GB', label: 'United Kingdom' },
      { value: 'US', label: 'United States' },
      { value: 'CA', label: 'Canada' },
      { value: 'AU', label: 'Australia' },
      { value: 'IN', label: 'India' },
      { value: 'DE', label: 'Germany' },
      { value: 'FR', label: 'France' },
      { value: 'JP', label: 'Japan' },
      { value: 'BR', label: 'Brazil' },
      { value: 'AR', label: 'Argentina' },
      { value: 'GM', label: 'Gambia' },
    ];
    console.log('🌍 Using fallback countries:', fallbackOptions.slice(0, 3));
    return fallbackOptions;
  }, [countriesResponse, countriesError, isLoadingCountries]);

  // Populate form data when address is loaded
  useEffect(() => {
    const addressToLoad = addressFromState || addressData;

    if (addressToLoad) {
      setFormData({
        name: addressToLoad.name || '',
        description: addressToLoad.description || '',
        addrLine1: addressToLoad.addrLine1 || '',
        addrLine2: addressToLoad.addrLine2 || '',
        addrLine3: addressToLoad.addrLine3 || '',
        town: addressToLoad.town || '',
        county: addressToLoad.county || '',
        postcode: addressToLoad.postcode || '',
        country: addressToLoad.country || '',
        telPrefix: addressToLoad.telPrefix || '',
        telNo: addressToLoad.telNo || '',
        telNoAlt: addressToLoad.telNoAlt || '',
        faxNo: addressToLoad.faxNo || '',
        emailAddr: addressToLoad.emailAddr || '',
        landmark: addressToLoad.landmark || '',
      });
    }
  }, [addressFromState, addressData]);

  const handleInputChange =
    (field: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value,
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
      const submitData: AddressFormData = {
        name: formData.name,
        description: formData.description,
        addrLine1: formData.addrLine1,
        addrLine2: formData.addrLine2,
        addrLine3: formData.addrLine3,
        town: formData.town,
        county: formData.county,
        postcode: formData.postcode,
        country: formData.country,
        telPrefix: formData.telPrefix,
        telNo: formData.telNo,
        telNoAlt: formData.telNoAlt,
        faxNo: formData.faxNo,
        emailAddr: formData.emailAddr,
        landmark: formData.landmark,
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

  const getFieldsForStep = (stepIndex: number): (keyof FormValues)[] => {
    switch (stepIndex) {
      case 0:
        return ['name', 'description'];
      case 1:
        return ['addrLine1', 'town', 'postcode', 'country'];
      case 2:
        return ['telPrefix', 'telNo'];
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
      isLoadingCountries,
      countriesError,
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

  // Show loading state only for address data, not countries
  if (isLoadingAddress) {
    return (
      <div className='flex items-center justify-center min-h-[300px]'>
        <div className='text-center space-y-4'>
          <CircularProgress />
          <p className='text-sm text-gray-600 dark:text-gray-400'>Loading address data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (addressError) {
    return (
      <div className='flex items-center justify-center min-h-[300px]'>
        <div className='text-center space-y-4'>
          <h3 className='text-lg font-semibold text-red-600 dark:text-red-400'>
            Failed to Load Address
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            {addressError.message || 'There was an error loading the address data.'}
          </p>
          <button
            onClick={handleBack}
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
          >
            Back to Addresses
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
