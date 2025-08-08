import React from 'react';
import { Person, LocationOn, ContactPhone, Business } from '@mui/icons-material';
import SectionHeader from '../availability/SectionHeader';
import FormField from '../availability/FormField';
import Input from '../availability/Input';
import Select from './Select';

export interface FormValues {
  name: string;
  description: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  town: string;
  county?: string;
  postcode: string;
  country: string;
  telAreaCode: string;
  telNo: string;
  alternateTelNo?: string;
  faxNo?: string;
  emailAddress?: string;
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

        <FormField label='Address Line 2' htmlFor='addressLine2' error={fieldErrors.addressLine2}>
          <Input
            id='addressLine2'
            value={formData.addressLine2 || ''}
            onChange={handleInputChange('addressLine2')}
            onKeyDown={handleKeyPress}
            placeholder='Apartment, suite, unit, building, floor, etc.'
            error={!!fieldErrors.addressLine2}
          />
        </FormField>

        <FormField label='Address Line 3' htmlFor='addressLine3' error={fieldErrors.addressLine3}>
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
};

// Step 3: Contact Details Component
export const ContactDetailsStep: React.FC<StepComponentProps> = ({
  formData,
  fieldErrors,
  handleInputChange,
}) => {
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

          <FormField label='Telephone Number' htmlFor='telNo' required error={fieldErrors.telNo}>
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

        <FormField label='Email Address' htmlFor='emailAddress' error={fieldErrors.emailAddress}>
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
