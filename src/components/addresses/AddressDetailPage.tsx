import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import {
  ArrowBack,
  ArrowForward,
  ArrowBackIos,
  LocationOn,
  ContactPhone,
  Business,
  CheckCircle,
  Save,
  Person,
} from '@mui/icons-material';
import { CircularProgress, Stepper, Step, StepLabel } from '@mui/material';
import SectionHeader from '../availability/SectionHeader';
import FormField from '../availability/FormField';
import Input from '../availability/Input';
import Select from './Select';
import AddressPreview from './AddressPreview';

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

type FormValues = z.infer<typeof formSchema>;

const steps = [
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

// Mock data for existing address
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

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[300px]'>
        <CircularProgress />
      </div>
    );
  }

  const handleBack = () => {
    navigate('/addresses');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <section aria-labelledby='basic-section' className='space-y-6'>
            <SectionHeader
              icon={<Person className='w-5 h-5' />}
              title='Basic Information'
              subtitle='Enter the name and description for this address'
            />

            <div className='space-y-6'>
              <FormField label='Name' htmlFor='name' required error={fieldErrors.name}>
                <Input
                  id='name'
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  onKeyDown={handleKeyPress}
                  placeholder='Enter address name'
                  error={!!fieldErrors.name}
                  autoFocus
                />
              </FormField>

              <FormField
                label='Description'
                htmlFor='description'
                required
                error={fieldErrors.description}
              >
                <Input
                  id='description'
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  onKeyDown={handleKeyPress}
                  placeholder='Enter address description'
                  error={!!fieldErrors.description}
                />
              </FormField>
            </div>
          </section>
        );

      case 1:
        return (
          <section aria-labelledby='address-section' className='space-y-6'>
            <SectionHeader
              icon={<LocationOn className='w-5 h-5' />}
              title='Address Details'
              subtitle='Enter the complete address information'
            />

            <div className='space-y-6'>
              <FormField
                label='Address Line 1'
                htmlFor='addressLine1'
                required
                error={fieldErrors.addressLine1}
              >
                <Input
                  id='addressLine1'
                  value={formData.addressLine1}
                  onChange={handleInputChange('addressLine1')}
                  onKeyDown={handleKeyPress}
                  placeholder='Street address, building number'
                  error={!!fieldErrors.addressLine1}
                  autoFocus
                />
              </FormField>

              <FormField
                label='Address Line 2'
                htmlFor='addressLine2'
                error={fieldErrors.addressLine2}
              >
                <Input
                  id='addressLine2'
                  value={formData.addressLine2 || ''}
                  onChange={handleInputChange('addressLine2')}
                  onKeyDown={handleKeyPress}
                  placeholder='Apartment, suite, unit, building, floor, etc.'
                  error={!!fieldErrors.addressLine2}
                />
              </FormField>

              <FormField
                label='Address Line 3'
                htmlFor='addressLine3'
                error={fieldErrors.addressLine3}
              >
                <Input
                  id='addressLine3'
                  value={formData.addressLine3 || ''}
                  onChange={handleInputChange('addressLine3')}
                  onKeyDown={handleKeyPress}
                  placeholder='Additional address information'
                  error={!!fieldErrors.addressLine3}
                />
              </FormField>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField label='Town' htmlFor='town' required error={fieldErrors.town}>
                  <Input
                    id='town'
                    value={formData.town}
                    onChange={handleInputChange('town')}
                    placeholder='Enter town/city'
                    error={!!fieldErrors.town}
                  />
                </FormField>

                <FormField label='County' htmlFor='county' error={fieldErrors.county}>
                  <Input
                    id='county'
                    value={formData.county || ''}
                    onChange={handleInputChange('county')}
                    placeholder='Enter county/state'
                    error={!!fieldErrors.county}
                  />
                </FormField>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  label='Postcode'
                  htmlFor='postcode'
                  required
                  error={fieldErrors.postcode}
                >
                  <Input
                    id='postcode'
                    value={formData.postcode}
                    onChange={handleInputChange('postcode')}
                    onKeyDown={handleKeyPress}
                    placeholder='Enter postcode'
                    error={!!fieldErrors.postcode}
                  />
                </FormField>

                <FormField label='Country' htmlFor='country' required error={fieldErrors.country}>
                  <Select
                    id='country'
                    value={formData.country}
                    onChange={handleInputChange('country')}
                    onKeyDown={handleKeyPress}
                    options={countryOptions}
                    error={!!fieldErrors.country}
                  />
                </FormField>
              </div>
            </div>
          </section>
        );

      case 2:
        return (
          <section aria-labelledby='contact-section' className='space-y-6'>
            <SectionHeader
              icon={<ContactPhone className='w-5 h-5' />}
              title='Contact Details'
              subtitle='Enter contact information for this address'
            />

            <div className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <FormField
                  label='Area Code'
                  htmlFor='telAreaCode'
                  required
                  error={fieldErrors.telAreaCode}
                >
                  <Input
                    id='telAreaCode'
                    value={formData.telAreaCode}
                    onChange={handleInputChange('telAreaCode')}
                    placeholder='0161'
                    error={!!fieldErrors.telAreaCode}
                    autoFocus
                  />
                </FormField>

                <FormField
                  label='Telephone Number'
                  htmlFor='telNo'
                  required
                  error={fieldErrors.telNo}
                >
                  <Input
                    id='telNo'
                    value={formData.telNo}
                    onChange={handleInputChange('telNo')}
                    placeholder='Enter telephone number'
                    error={!!fieldErrors.telNo}
                  />
                </FormField>
              </div>

              <FormField
                label='Alternate Telephone'
                htmlFor='alternateTelNo'
                error={fieldErrors.alternateTelNo}
              >
                <Input
                  id='alternateTelNo'
                  value={formData.alternateTelNo || ''}
                  onChange={handleInputChange('alternateTelNo')}
                  placeholder='Enter alternate telephone number'
                  error={!!fieldErrors.alternateTelNo}
                />
              </FormField>

              <FormField label='Fax Number' htmlFor='faxNo' error={fieldErrors.faxNo}>
                <Input
                  id='faxNo'
                  value={formData.faxNo || ''}
                  onChange={handleInputChange('faxNo')}
                  placeholder='Enter fax number'
                  error={!!fieldErrors.faxNo}
                />
              </FormField>

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
                  placeholder='Enter email address'
                  error={!!fieldErrors.emailAddress}
                />
              </FormField>
            </div>
          </section>
        );

      case 3:
        return (
          <section aria-labelledby='additional-section' className='space-y-6'>
            <SectionHeader
              icon={<Business className='w-5 h-5' />}
              title='Additional Information'
              subtitle='Optional additional details for this address'
            />

            <div className='space-y-6'>
              <FormField label='Landmark' htmlFor='landmark' error={fieldErrors.landmark}>
                <Input
                  id='landmark'
                  value={formData.landmark || ''}
                  onChange={handleInputChange('landmark')}
                  onKeyDown={handleKeyPress}
                  placeholder='Enter nearby landmark or reference point'
                  error={!!fieldErrors.landmark}
                  autoFocus
                />
              </FormField>

              <div className='p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl'>
                <div className='flex items-start gap-3'>
                  <div className='flex-shrink-0'>
                    <div className='w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center'>
                      <Business className='w-4 h-4 text-blue-600 dark:text-blue-400' />
                    </div>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-blue-900 dark:text-blue-100 mb-1'>
                      Address Complete
                    </h4>
                    <p className='text-sm text-blue-700 dark:text-blue-300'>
                      You've filled in all the required information. Review your details in the
                      preview panel and click "Save Address" when ready.
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
              <span className='font-medium'>Address saved successfully!</span>
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
                      className='flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium text-sm rounded-md shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-600/30 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]'
                    >
                      {saving ? (
                        <CircularProgress size={16} className='text-white' />
                      ) : (
                        <Save className='w-4 h-4' />
                      )}
                      {saving ? 'Saving...' : 'Save Address'}
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
            <AddressPreview formData={formData} currentStep={currentStep} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressDetailPage;
