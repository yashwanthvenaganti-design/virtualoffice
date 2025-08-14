import React from 'react';
import { Person, LocationOn, ContactPhone, Business } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import SectionHeader from '../availability/SectionHeader';
import FormField from '../availability/FormField';
import Input from '../availability/Input';
import Select from './Select';

export interface FormValues {
  name: string;
  description: string;
  addrLine1: string;
  addrLine2?: string;
  addrLine3?: string;
  town: string;
  county?: string;
  postcode: string;
  country: string;
  telPrefix: string;
  telNo: string;
  telNoAlt?: string;
  faxNo?: string;
  emailAddr?: string;
  landmark?: string;
}

export interface StepComponentProps {
  formData: FormValues;
  fieldErrors: Partial<Record<keyof FormValues, string>>;
  handleInputChange: (
    field: keyof FormValues
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent) => void;
  countryOptions: Array<{ value: string; label: string }>;
  isLoadingCountries?: boolean;
  countriesError?: Error | null;
}

// Step 1: Basic Information Component
export const BasicInformationStep: React.FC<StepComponentProps> = ({
  formData,
  fieldErrors,
  handleInputChange,
  handleKeyPress,
}) => {
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
};

// Step 2: Address Details Component
export const AddressDetailsStep: React.FC<StepComponentProps> = ({
  formData,
  fieldErrors,
  handleInputChange,
  handleKeyPress,
  countryOptions,
  isLoadingCountries = false,
  countriesError = null,
}) => {
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
          htmlFor='addrLine1'
          required
          error={fieldErrors.addrLine1}
        >
          <Input
            id='addrLine1'
            value={formData.addrLine1}
            onChange={handleInputChange('addrLine1')}
            onKeyDown={handleKeyPress}
            placeholder='Street address, building number'
            error={!!fieldErrors.addrLine1}
            autoFocus
          />
        </FormField>

        <FormField label='Address Line 2' htmlFor='addrLine2' error={fieldErrors.addrLine2}>
          <Input
            id='addrLine2'
            value={formData.addrLine2 || ''}
            onChange={handleInputChange('addrLine2')}
            onKeyDown={handleKeyPress}
            placeholder='Apartment, suite, unit, building, floor, etc.'
            error={!!fieldErrors.addrLine2}
          />
        </FormField>

        <FormField label='Address Line 3' htmlFor='addrLine3' error={fieldErrors.addrLine3}>
          <Input
            id='addrLine3'
            value={formData.addrLine3 || ''}
            onChange={handleInputChange('addrLine3')}
            onKeyDown={handleKeyPress}
            placeholder='Additional address information'
            error={!!fieldErrors.addrLine3}
          />
        </FormField>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <FormField label='Town' htmlFor='town' required error={fieldErrors.town}>
            <Input
              id='town'
              value={formData.town}
              onChange={handleInputChange('town')}
              onKeyDown={handleKeyPress}
              placeholder='Enter town/city'
              error={!!fieldErrors.town}
            />
          </FormField>

          <FormField label='County' htmlFor='county' error={fieldErrors.county}>
            <Input
              id='county'
              value={formData.county || ''}
              onChange={handleInputChange('county')}
              onKeyDown={handleKeyPress}
              placeholder='Enter county/state'
              error={!!fieldErrors.county}
            />
          </FormField>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <FormField label='Postcode' htmlFor='postcode' required error={fieldErrors.postcode}>
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
            <div className='relative'>
              <Select
                id='country'
                value={formData.country}
                onChange={handleInputChange('country')}
                options={countryOptions}
                error={!!fieldErrors.country}
                disabled={isLoadingCountries}
                placeholder={
                  isLoadingCountries
                    ? 'Loading countries...'
                    : countriesError
                      ? 'Select a country (using fallback list)'
                      : 'Select a country'
                }
                showEmptyOption={true}
              />
              {isLoadingCountries && (
                <div className='absolute right-10 top-1/2 transform -translate-y-1/2'>
                  <CircularProgress size={16} />
                </div>
              )}
            </div>
            {countriesError && !isLoadingCountries && (
              <p className='mt-1 text-xs text-amber-600 dark:text-amber-400'>
                Using fallback countries list
              </p>
            )}
          </FormField>
        </div>
      </div>
    </section>
  );
};

// Step 3: Contact Details Component
export const ContactDetailsStep: React.FC<StepComponentProps> = ({
  formData,
  fieldErrors,
  handleInputChange,
  handleKeyPress,
}) => {
  return (
    <section aria-labelledby='contact-section' className='space-y-6'>
      <SectionHeader
        icon={<ContactPhone className='w-5 h-5' />}
        title='Contact Details'
        subtitle='Enter contact information for this address'
      />

      <div className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <FormField
            label='Telephone Prefix'
            htmlFor='telPrefix'
            required
            error={fieldErrors.telPrefix}
          >
            <Input
              id='telPrefix'
              value={formData.telPrefix}
              onChange={handleInputChange('telPrefix')}
              onKeyDown={handleKeyPress}
              placeholder='+44 or 0161'
              error={!!fieldErrors.telPrefix}
              autoFocus
            />
          </FormField>

          <FormField label='Telephone Number' htmlFor='telNo' required error={fieldErrors.telNo}>
            <Input
              id='telNo'
              value={formData.telNo}
              onChange={handleInputChange('telNo')}
              onKeyDown={handleKeyPress}
              placeholder='Enter telephone number'
              error={!!fieldErrors.telNo}
            />
          </FormField>
        </div>

        <FormField label='Alternate Telephone' htmlFor='telNoAlt' error={fieldErrors.telNoAlt}>
          <Input
            id='telNoAlt'
            value={formData.telNoAlt || ''}
            onChange={handleInputChange('telNoAlt')}
            onKeyDown={handleKeyPress}
            placeholder='Enter alternate telephone number'
            error={!!fieldErrors.telNoAlt}
          />
        </FormField>

        <FormField label='Fax Number' htmlFor='faxNo' error={fieldErrors.faxNo}>
          <Input
            id='faxNo'
            value={formData.faxNo || ''}
            onChange={handleInputChange('faxNo')}
            onKeyDown={handleKeyPress}
            placeholder='Enter fax number'
            error={!!fieldErrors.faxNo}
          />
        </FormField>

        <FormField label='Email Address' htmlFor='emailAddr' error={fieldErrors.emailAddr}>
          <Input
            id='emailAddr'
            type='email'
            value={formData.emailAddr || ''}
            onChange={handleInputChange('emailAddr')}
            onKeyDown={handleKeyPress}
            placeholder='Enter email address'
            error={!!fieldErrors.emailAddr}
          />
        </FormField>
      </div>
    </section>
  );
};

// Step 4: Additional Information Component
export const AdditionalInformationStep: React.FC<StepComponentProps> = ({
  formData,
  fieldErrors,
  handleInputChange,
  handleKeyPress,
}) => {
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
                You've filled in all the required information. Review your details in the preview
                panel and click "Save Address" when ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
