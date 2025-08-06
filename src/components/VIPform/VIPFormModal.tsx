import React, { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';
import FormRadioGroup from './FormRadioGroup';
import { useTheme } from '../../theme/ThemeContext';
import { Portal } from '@mui/material';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

const commonInputProps = {
  fullWidth: true,
  size: 'small' as const,
  variant: 'outlined' as const,
};

const VIPSchema = z.object({
  title: z.string().optional(),
  forename: z.string().min(2, 'Forename must be at least 2 characters'),
  surname: z.string().min(2, 'Surname must be at least 2 characters'),
  sex: z.enum(['female', 'male', 'unspecified']),
  companyName: z.string().min(1, 'Company name is required'),
  telNo: z
    .string()
    .min(1, 'Telephone number is required')
    .regex(/^[\d\s\-+()]+$/, 'Please enter a valid phone number'),
  alternateTelNo: z
    .string()
    .regex(/^[\d\s\-+()]*$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  emailAddress: z.string().email('Please enter a valid email').optional().or(z.literal('')),
});

export type VIPFormData = z.infer<typeof VIPSchema>;

interface VIPFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: VIPFormData) => void;
  initialData?: Partial<VIPFormData>;
}

const titleOptions = [
  { value: '', label: 'Select one' },
  { value: 'mr', label: 'Mr' },
  { value: 'mrs', label: 'Mrs' },
  { value: 'miss', label: 'Miss' },
  { value: 'ms', label: 'Ms' },
  { value: 'dr', label: 'Dr' },
  { value: 'prof', label: 'Prof' },
];

const sexOptions = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'unspecified', label: 'Unspecified' },
];

const VIPFormModal: React.FC<VIPFormModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const { isDark } = useTheme();
  const firstInputRef = useRef<HTMLInputElement>(null);

  const defaultValues = useMemo(
    () => ({
      title: '',
      forename: '',
      surname: '',
      companyName: '',
      telNo: '',
      alternateTelNo: '',
      emailAddress: '',
      ...initialData,
      sex: (initialData?.sex ?? 'unspecified') as 'female' | 'male' | 'unspecified',
    }),
    [initialData]
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<VIPFormData>({
    resolver: zodResolver(VIPSchema),
    defaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues);
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, reset, defaultValues]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className='fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'
        onClick={e => e.target === e.currentTarget && onClose()}
        role='dialog'
        aria-modal='true'
      >
        <div
          className={`relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-lg shadow-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
          onClick={e => e.stopPropagation()}
        >
          <header
            className={`flex justify-between items-center p-4 border-b ${isDark ? 'border-gray-700 bg-gray-800/80' : 'border-gray-200 bg-gray-50/80'} backdrop-blur-sm`}
          >
            <div className='flex items-center gap-4'>
              <div
                className={`p-2 rounded-lg ${isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}
              >
                <PersonIcon />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  VIP Detail
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Create or edit VIP contact information
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label='Close'
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
            >
              <CloseIcon />
            </button>
          </header>

          <form
            onSubmit={handleSubmit(data => {
              onSubmit(data);
              onClose();
            })}
            noValidate
          >
            <div className='p-6 overflow-y-auto max-h-[calc(90vh-140px)] grid grid-cols-1 lg:grid-cols-2 gap-8'>
              {/* Personal Details */}
              <section>
                <div className='flex items-center gap-2 mb-7'>
                  <PersonIcon className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h2
                    className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    Personal Details
                  </h2>
                </div>
                <div className='space-y-8'>
                  <FormControl fullWidth size='small' error={!!errors.title} variant='outlined'>
                    <InputLabel id='title-label'>Title</InputLabel>
                    <Select
                      labelId='title-label'
                      id='title'
                      label='Title'
                      defaultValue={watch('title') ?? ''}
                      {...register('title')}
                      sx={{
                        borderRadius: '6px',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'inherit',
                        },
                      }}
                    >
                      {titleOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.title && <FormHelperText>{errors.title.message}</FormHelperText>}
                  </FormControl>

                  <TextField
                    {...commonInputProps}
                    inputRef={firstInputRef}
                    label='Forename'
                    required
                    error={!!errors.forename}
                    helperText={errors.forename?.message}
                    {...register('forename')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                        py: 0.25,
                        px: 1,
                      },
                    }}
                  />

                  <TextField
                    {...commonInputProps}
                    label='Surname'
                    required
                    error={!!errors.surname}
                    helperText={errors.surname?.message}
                    {...register('surname')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                        py: 0.25,
                        px: 1,
                      },
                    }}
                  />

                  <FormRadioGroup
                    name='sex'
                    label='Sex'
                    options={sexOptions}
                    register={register}
                    error={errors.sex}
                    watch={watch}
                    isDark={isDark}
                  />
                </div>
              </section>

              {/* Contact Details */}
              <section>
                <div className='flex items-center gap-2 mb-7'>
                  <BusinessIcon className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h2
                    className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    Company & Contact Details
                  </h2>
                </div>
                <div className='space-y-6'>
                  <TextField
                    {...commonInputProps}
                    label='Company Name'
                    required
                    error={!!errors.companyName}
                    helperText={errors.companyName?.message}
                    {...register('companyName')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                        py: 0.25,
                        px: 1,
                      },
                    }}
                  />
                  <TextField
                    {...commonInputProps}
                    label='Tel No'
                    type='tel'
                    required
                    error={!!errors.telNo}
                    helperText={errors.telNo?.message}
                    {...register('telNo')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                      },
                    }}
                  />
                  <TextField
                    {...commonInputProps}
                    label='Alternate Tel No'
                    type='tel'
                    error={!!errors.alternateTelNo}
                    helperText={errors.alternateTelNo?.message}
                    {...register('alternateTelNo')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                      },
                    }}
                  />
                  <TextField
                    {...commonInputProps}
                    label='Email Address'
                    type='email'
                    error={!!errors.emailAddress}
                    helperText={errors.emailAddress?.message}
                    {...register('emailAddress')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                      },
                    }}
                  />
                </div>
              </section>
            </div>

            <footer className='flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700'>
              <button
                type='button'
                onClick={onClose}
                className={`px-6 py-2.5 text-sm font-medium rounded-lg border ${isDark ? 'text-gray-300 border-gray-600 hover:bg-gray-700' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={!isValid || isSubmitting}
                className={`px-6 py-2.5 text-sm font-medium text-white rounded-lg ${isSubmitting || !isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} transition-colors`}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </footer>
          </form>
        </div>
      </div>
    </Portal>
  );
};

export default VIPFormModal;
