import React, { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowBack,
  ArrowForward,
  ArrowBackIos,
  LocationOn,
  ContactPhone,
  Email,
  Business,
  CheckCircle,
  Save,
  Person,
  Home,
  Phone,
  Fax,
  AlternateEmail,
} from '@mui/icons-material';
import { CircularProgress, Stepper, Step, StepLabel } from '@mui/material';
import SectionHeader from '../availability/SectionHeader';
import FormField from '../availability/FormField';
import Input from '../availability/Input';
import Select from './Select';
import AddressPreview from './AddressPreview';

const formSchema = z.object({
  // Basic Information
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),

  // Address Details
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  town: z.string().min(1, 'Town is required'),
  county: z.string().optional(),
  postcode: z.string().min(1, 'Postcode is required'),
  country: z.string().min(1, 'Country is required'),

  // Contact Details
  telAreaCode: z.string().min(1, 'Area code is required'),
  telNo: z.string().min(1, 'Telephone number is required'),
  alternateTelNo: z.string().optional(),
  faxNo: z.string().optional(),
  emailAddress: z.string().email('Invalid email address').optional().or(z.literal('')),

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
const addressData = {
  1: {
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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
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
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isEdit && id) {
        const found = addressData[id as unknown as keyof typeof addressData];
        if (found) {
          reset(found);
        }
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id, isEdit, reset]);

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

  const handleNext = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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

  const getStepErrors = (stepIndex: number) => {
    const fieldsForStep = getFieldsForStep(stepIndex);
    return fieldsForStep.some(field => errors[field]);
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
              <FormField label='Name' htmlFor='name' required error={errors.name?.message}>
                <Input
                  {...register('name')}
                  id='name'
                  placeholder='Enter address name'
                  error={!!errors.name}
                  autoFocus
                />
              </FormField>

              <FormField
                label='Description'
                htmlFor='description'
                required
                error={errors.description?.message}
              >
                <Input
                  {...register('description')}
                  id='description'
                  placeholder='Enter address description'
                  error={!!errors.description}
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
                error={errors.addressLine1?.message}
              >
                <Input
                  {...register('addressLine1')}
                  id='addressLine1'
                  placeholder='Street address, building number'
                  error={!!errors.addressLine1}
                  autoFocus
                />
              </FormField>

              <FormField
                label='Address Line 2'
                htmlFor='addressLine2'
                error={errors.addressLine2?.message}
              >
                <Input
                  {...register('addressLine2')}
                  id='addressLine2'
                  placeholder='Apartment, suite, unit, building, floor, etc.'
                  error={!!errors.addressLine2}
                />
              </FormField>

              <FormField
                label='Address Line 3'
                htmlFor='addressLine3'
                error={errors.addressLine3?.message}
              >
                <Input
                  {...register('addressLine3')}
                  id='addressLine3'
                  placeholder='Additional address information'
                  error={!!errors.addressLine3}
                />
              </FormField>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField label='Town' htmlFor='town' required error={errors.town?.message}>
                  <Input
                    {...register('town')}
                    id='town'
                    placeholder='Enter town/city'
                    error={!!errors.town}
                  />
                </FormField>

                <FormField label='County' htmlFor='county' error={errors.county?.message}>
                  <Input
                    {...register('county')}
                    id='county'
                    placeholder='Enter county/state'
                    error={!!errors.county}
                  />
                </FormField>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  label='Postcode'
                  htmlFor='postcode'
                  required
                  error={errors.postcode?.message}
                >
                  <Input
                    {...register('postcode')}
                    id='postcode'
                    placeholder='Enter postcode'
                    error={!!errors.postcode}
                  />
                </FormField>

                <FormField
                  label='Country'
                  htmlFor='country'
                  required
                  error={errors.country?.message}
                >
                  <Select
                    {...register('country')}
                    id='country'
                    options={countryOptions}
                    error={!!errors.country}
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
                  error={errors.telAreaCode?.message}
                >
                  <Input
                    {...register('telAreaCode')}
                    id='telAreaCode'
                    placeholder='0161'
                    error={!!errors.telAreaCode}
                    autoFocus
                  />
                </FormField>

                <FormField
                  label='Telephone Number'
                  htmlFor='telNo'
                  required
                  error={errors.telNo?.message}
                  //   className='md:col-span-2'
                >
                  <Input
                    {...register('telNo')}
                    id='telNo'
                    placeholder='Enter telephone number'
                    error={!!errors.telNo}
                  />
                </FormField>
              </div>

              <FormField
                label='Alternate Telephone'
                htmlFor='alternateTelNo'
                error={errors.alternateTelNo?.message}
              >
                <Input
                  {...register('alternateTelNo')}
                  id='alternateTelNo'
                  placeholder='Enter alternate telephone number'
                  error={!!errors.alternateTelNo}
                />
              </FormField>

              <FormField label='Fax Number' htmlFor='faxNo' error={errors.faxNo?.message}>
                <Input
                  {...register('faxNo')}
                  id='faxNo'
                  placeholder='Enter fax number'
                  error={!!errors.faxNo}
                />
              </FormField>

              <FormField
                label='Email Address'
                htmlFor='emailAddress'
                error={errors.emailAddress?.message}
              >
                <Input
                  {...register('emailAddress')}
                  id='emailAddress'
                  type='email'
                  placeholder='Enter email address'
                  error={!!errors.emailAddress}
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
              <FormField label='Landmark' htmlFor='landmark' error={errors.landmark?.message}>
                <Input
                  {...register('landmark')}
                  id='landmark'
                  placeholder='Enter nearby landmark or reference point'
                  error={!!errors.landmark}
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
                            : currentStep > index
                              ? 'bg-green-600 text-white'
                              : getStepErrors(index)
                                ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                                : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                        }
                      `}
                      >
                        {currentStep > index ? <CheckCircle className='w-4 h-4' /> : step.icon}
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

        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
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
                    className='flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none'
                  >
                    <ArrowBackIos className='w-4 h-4' />
                    Previous
                  </button>

                  {currentStep < steps.length - 1 ? (
                    <button
                      type='button'
                      onClick={handleNext}
                      className='flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]'
                    >
                      Next
                      <ArrowForward className='w-4 h-4' />
                    </button>
                  ) : (
                    <button
                      type='submit'
                      disabled={saving || !isDirty}
                      className='flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-600/30 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]'
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
                  className='px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className='lg:col-span-1'>
            <AddressPreview formData={watchedValues} currentStep={currentStep} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressDetailPage;
