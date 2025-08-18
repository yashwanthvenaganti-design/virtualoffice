import React from 'react';
import {
  LocationOn,
  Phone,
  Email,
  Fax,
  Business,
  Home,
  CheckCircle,
  RadioButtonUnchecked,
} from '@mui/icons-material';

interface AddressPreviewProps {
  formData: {
    name?: string;
    description?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    town?: string;
    county?: string;
    postcode?: string;
    country?: string;
    telAreaCode?: string;
    telNo?: string;
    alternateTelNo?: string;
    emailAddress?: string;
    landmark?: string;
  };
  currentStep?: number;
}

const AddressPreview: React.FC<AddressPreviewProps> = ({ formData }) => {
  const formatPhone = () => {
    if (formData.telAreaCode && formData.telNo) {
      return `${formData.telAreaCode} ${formData.telNo}`;
    }
    return formData.telNo || '';
  };

  const getCountryLabel = () => {
    const countries = {
      GB: 'United Kingdom',
      US: 'United States',
      CA: 'Canada',
      AU: 'Australia',
    };
    return countries[formData.country as keyof typeof countries] || formData.country;
  };

  const getCompletionStatus = () => {
    const requiredFields = [
      formData.name,
      formData.description,
      formData.addressLine1,
      formData.town,
      formData.postcode,
      formData.country,
      formData.telAreaCode,
      formData.telNo,
    ];

    const completed = requiredFields.filter(Boolean).length;
    const total = requiredFields.length;
    const percentage = Math.round((completed / total) * 100);

    return { completed, total, percentage };
  };

  const completion = getCompletionStatus();

  return (
    <div className='sticky top-6'>
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
        {/* Header */}
        <div className='p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center'>
              <LocationOn className='w-5 h-5 text-blue-600 dark:text-blue-400' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                What your PA sees
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                How this address will appear
              </p>
            </div>
          </div>

          {/* Completion Progress */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-gray-600 dark:text-gray-400'>Completion</span>
              <span className='font-medium text-gray-900 dark:text-gray-100'>
                {completion.completed}/{completion.total} fields
              </span>
            </div>
            <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
              <div
                className='bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all duration-300'
                style={{ width: `${completion.percentage}%` }}
              />
            </div>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              {completion.percentage}% complete
            </p>
          </div>
        </div>

        {/* Preview Content */}
        <div className='p-6 space-y-6'>
          {/* Basic Information */}
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Home className='w-4 h-4 text-gray-400' />
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                Basic Information
              </span>
            </div>
            <div className='ml-6 space-y-2'>
              <div className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                {formData.name || (
                  <span className='text-gray-400 dark:text-gray-500 font-normal'>
                    Address name...
                  </span>
                )}
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                {formData.description || (
                  <span className='text-gray-400 dark:text-gray-500'>Description...</span>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <LocationOn className='w-4 h-4 text-gray-400' />
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Address</span>
            </div>
            <div className='ml-6 space-y-1'>
              {formData.addressLine1 ? (
                <>
                  <div className='text-sm text-gray-900 dark:text-gray-100'>
                    {formData.addressLine1}
                  </div>
                  {formData.addressLine2 && (
                    <div className='text-sm text-gray-600 dark:text-gray-400'>
                      {formData.addressLine2}
                    </div>
                  )}
                  {formData.addressLine3 && (
                    <div className='text-sm text-gray-600 dark:text-gray-400'>
                      {formData.addressLine3}
                    </div>
                  )}
                  <div className='text-sm text-gray-900 dark:text-gray-100'>
                    {[formData.town, formData.county].filter(Boolean).join(', ')}
                  </div>
                  <div className='text-sm text-gray-900 dark:text-gray-100'>
                    {formData.postcode} {getCountryLabel()}
                  </div>
                </>
              ) : (
                <div className='text-sm text-gray-400 dark:text-gray-500'>
                  Address details will appear here...
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Phone className='w-4 h-4 text-gray-400' />
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Contact</span>
            </div>
            <div className='ml-6 space-y-2'>
              {formatPhone() ? (
                <div className='flex items-center gap-2'>
                  <Phone className='w-3 h-3 text-gray-400' />
                  <span className='text-sm text-gray-900 dark:text-gray-100'>{formatPhone()}</span>
                </div>
              ) : (
                <div className='text-sm text-gray-400 dark:text-gray-500'>
                  Primary phone number...
                </div>
              )}

              {formData.alternateTelNo && (
                <div className='flex items-center gap-2'>
                  <Phone className='w-3 h-3 text-gray-400' />
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    {formData.alternateTelNo} (Alt)
                  </span>
                </div>
              )}

              {formData.emailAddress && (
                <div className='flex items-center gap-2'>
                  <Email className='w-3 h-3 text-gray-400' />
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    {formData.emailAddress}
                  </span>
                </div>
              )}
            </div>
          </div>

          {formData.landmark && (
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <Business className='w-4 h-4 text-gray-400' />
                <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Additional
                </span>
              </div>
              <div className='ml-6'>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  <span className='font-medium'>Landmark:</span> {formData.landmark}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressPreview;
