import React from 'react';
import { Person, Message } from '@mui/icons-material';
import SectionHeader from '../availability/SectionHeader';
import FormField from '../availability/FormField';
import Input from '../availability/Input';

export interface GreetingFormValues {
  name: string;
  greeting: string;
  salutation: boolean;
}

export interface GreetingStepComponentProps {
  formData: GreetingFormValues;
  fieldErrors: Partial<Record<keyof GreetingFormValues, string>>;
  handleInputChange: (
    field: keyof GreetingFormValues
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent) => void;
}

// Step 1: Basic Information Component
export const BasicInformationStep: React.FC<GreetingStepComponentProps> = ({
  formData,
  fieldErrors,
  handleInputChange,
  handleKeyPress,
}) => {
  return (
    <section aria-labelledby='basic-section' className='space-y-6'>
      <SectionHeader
        icon={<Person className='w-5 h-5' />}
        title='Profile Information'
        subtitle='Enter the profile name for this greeting'
      />

      <div className='space-y-6'>
        <FormField label='Profile Name' htmlFor='name' required error={fieldErrors.name}>
          <Input
            id='name'
            value={formData.name}
            onChange={handleInputChange('name')}
            onKeyDown={handleKeyPress}
            placeholder='e.g., Good Morning, Default, Welcome Greeting'
            error={!!fieldErrors.name}
            autoFocus
          />
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
            This helps identify the greeting in your list. Common names include "Good Morning",
            "Default", or "Welcome Greeting".
          </p>
        </FormField>
      </div>
    </section>
  );
};

// Step 2: Greeting Content Component
export const GreetingContentStep: React.FC<GreetingStepComponentProps> = ({
  formData,
  fieldErrors,
  handleInputChange,
  handleKeyPress,
}) => {
  const maxLength = 500;
  const remainingChars = maxLength - (formData.greeting?.length || 0);

  return (
    <section aria-labelledby='greeting-section' className='space-y-6'>
      <SectionHeader
        icon={<Message className='w-5 h-5' />}
        title='Greeting Content'
        subtitle='Enter the greeting message and configure display options'
      />

      <div className='space-y-6'>
        <FormField
          label='Text for the PA to read'
          htmlFor='greeting'
          required
          error={fieldErrors.greeting}
        >
          <div className='relative'>
            <textarea
              id='greeting'
              value={formData.greeting}
              onChange={handleInputChange('greeting')}
              onKeyDown={handleKeyPress}
              placeholder='Enter the greeting message your PA will read to callers...'
              maxLength={maxLength}
              rows={6}
              className={`
                w-full px-4 py-3 text-sm
                bg-white dark:bg-gray-800
                border rounded-md
                text-gray-900 dark:text-gray-100
                placeholder-gray-500 dark:placeholder-gray-400
                transition-all duration-200
                focus:outline-none focus:ring-4
                disabled:bg-gray-50 dark:disabled:bg-gray-700
                disabled:text-gray-500 dark:disabled:text-gray-400
                disabled:cursor-not-allowed
                resize-none
                ${
                  fieldErrors.greeting
                    ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20 dark:focus:ring-red-400/20'
                    : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            />

            {/* Character count */}
            <div className='absolute bottom-3 right-3 flex items-center gap-2'>
              <span
                className={`text-xs ${remainingChars < 50 ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400 dark:text-gray-500'}`}
              >
                {remainingChars} characters remaining
              </span>
            </div>
          </div>

          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
            This is the message your PA will read to callers. Keep it clear and professional.
          </p>
        </FormField>

        {/* Salutation Toggle */}
        <FormField label='Display salutation' htmlFor='salutation'>
          <div className='flex items-center gap-4'>
            <label className='flex items-center gap-3 cursor-pointer'>
              <input
                type='radio'
                id='salutation-on'
                name='salutation'
                checked={formData.salutation === true}
                onChange={() =>
                  handleInputChange('salutation')({
                    target: { type: 'checkbox', checked: true },
                  } as any)
                }
                className='w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400'
              />
              <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>On</span>
            </label>

            <label className='flex items-center gap-3 cursor-pointer'>
              <input
                type='radio'
                id='salutation-off'
                name='salutation'
                checked={formData.salutation === false}
                onChange={() =>
                  handleInputChange('salutation')({
                    target: { type: 'checkbox', checked: false },
                  } as any)
                }
                className='w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400'
              />
              <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>Off</span>
            </label>
          </div>

          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
            When enabled, your PA will include a personalized salutation when reading this greeting.
          </p>
        </FormField>

        {/* Completion Message */}
        <div className='p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl'>
          <div className='flex items-start gap-3'>
            <div className='flex-shrink-0'>
              <div className='w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center'>
                <Message className='w-4 h-4 text-blue-600 dark:text-blue-400' />
              </div>
            </div>
            <div>
              <h4 className='text-sm font-medium text-blue-900 dark:text-blue-100 mb-1'>
                Greeting Complete
              </h4>
              <p className='text-sm text-blue-700 dark:text-blue-300'>
                You've configured your greeting message. Review how it will appear to your PA in the
                preview panel and click "Save Greeting" when ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
