import React, { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Typography,
  Divider,
  CircularProgress,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { ArrowBack, Edit, Save, Phone, Email, Sms, CheckCircle, Cancel } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import CompactCard from './CompactCard';
import CompactTextField from './CompactTextField';
import NotificationSwitch from './NotificationSwitch';
import PreviewCard from './PreviewCard';
import CustomTooltip from '../mui/CustomTooltip';

const formSchema = z.object({
  statusName: z.string().min(1, 'Status name is required'),
  availability: z.enum(['available', 'unavailable']),
  telNo: z.string().min(8, 'Invalid phone number'),
  emailNotifications: z.boolean(),
  emailAddress: z.string().email({ message: 'Invalid email address' }).optional().or(z.literal('')),
  smsNotifications: z.boolean(),
  smsNumber: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const availabilityData = [
  {
    id: 1,
    name: 'Available - Morning',
    availability: '08:00 AM - 12:00 PM',
    tel: '+1 234 567 890',
    email: 'morning@example.com',
    sms: 'Enabled',
  },
  {
    id: 2,
    name: 'Available - Evening',
    availability: '05:00 PM - 09:00 PM',
    tel: '+1 987 654 321',
    email: 'evening@example.com',
    sms: 'Disabled',
  },
];

const AvailabilityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      statusName: '',
      availability: 'available',
      telNo: '',
      emailNotifications: true,
      emailAddress: '',
      smsNotifications: true,
      smsNumber: '',
    },
  });

  // Simulate loading data
  useEffect(() => {
    setTimeout(() => {
      const found = availabilityData.find(item => item.id === Number(id));
      if (found) {
        reset({
          statusName: found.name,
          availability: found.name.toLowerCase().includes('available')
            ? 'available'
            : 'unavailable',
          telNo: found.tel,
          emailNotifications: !!found.email,
          emailAddress: found.email || '',
          smsNotifications: found.sms === 'Enabled',
          smsNumber: found.sms === 'Enabled' ? found.tel : '',
        });
      }
      setLoading(false);
    }, 500);
  }, [id, reset]);

  const watchedValues = watch();

  // Submit handler
  const onSubmit: SubmitHandler<FormValues> = async _data => {
    setSaving(true);
    try {
      // Simulate API save
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      // Handle error
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    navigate('/availability');
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: isDark
            ? 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'
            : 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ color: '#60A5FA', mb: 1 }} size={32} />
          <Typography variant='body1' sx={{ fontSize: '0.875rem' }}>
            Loading availability details...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark
          ? 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'
          : 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
        padding: { xs: 1.5, md: 3 },
        color: isDark ? 'white' : '#0F172A',
      }}
    >
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <IconButton
          onClick={handleBack}
          size='small'
          sx={{
            color: isDark ? '#94A3B8' : '#64748B',
            backgroundColor: isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(100, 116, 139, 0.1)',
            '&:hover': {
              backgroundColor: isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(100, 116, 139, 0.2)',
              color: isDark ? 'white' : '#0F172A',
            },
          }}
        >
          <ArrowBack sx={{ fontSize: 20 }} />
        </IconButton>

        <Box>
          <Typography
            variant='h4'
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #60A5FA 0%, #34D399 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.75rem',
              lineHeight: 1.2,
              mb: 0.5,
            }}
          >
            Manage Availability
          </Typography>
          <Typography
            variant='body2'
            sx={{
              color: isDark ? '#94A3B8' : '#64748B',
              fontSize: '0.875rem',
            }}
          >
            Configure your availability status and notification preferences
          </Typography>
        </Box>
      </Box>

      {saveSuccess && (
        <Alert
          severity='success'
          sx={{
            mb: 2,
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#22C55E',
            borderRadius: 1,
            fontSize: '0.8125rem',
          }}
        >
          Changes saved successfully!
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
            gap: 2.5,
          }}
        >
          {/* Left Column */}
          <Box className='flex flex-col gap-4'>
            {/* Status */}
            <CompactCard gradient='linear-gradient(90deg, #8B5CF6 0%, #06B6D4 100%)'>
              <Typography
                variant='subtitle1'
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: isDark ? 'white' : '#0F172A',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '0.9375rem',
                }}
              >
                <Edit sx={{ fontSize: 16 }} /> Status Configuration
              </Typography>
              <CompactTextField
                {...register('statusName')}
                label='Status Name'
                error={!!errors.statusName}
                helperText={errors.statusName?.message}
              />
            </CompactCard>

            {/* Availability */}
            <CompactCard gradient='linear-gradient(90deg, #34D399 0%, #10B981 100%)'>
              <Typography
                variant='subtitle1'
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: isDark ? 'white' : '#0F172A',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '0.9375rem',
                }}
              >
                {watchedValues.availability === 'available' ? (
                  <CheckCircle sx={{ fontSize: 16, color: '#22C55E' }} />
                ) : (
                  <Cancel sx={{ fontSize: 16, color: '#EF4444' }} />
                )}
                Availability Status
              </Typography>

              <RadioGroup
                row
                {...register('availability')}
                sx={{
                  gap: 2,
                  '& .MuiFormControlLabel-root': {
                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.3)' : 'rgba(241, 245, 249, 0.8)',
                    borderRadius: 1,
                    px: 1.5,
                    py: 0.5,
                    margin: 0,
                    border: isDark
                      ? '1px solid rgba(148, 163, 184, 0.2)'
                      : '1px solid rgba(226, 232, 240, 0.8)',
                  },
                  '& .MuiRadio-root': {
                    color: isDark ? '#60A5FA' : '#3B82F6',
                    padding: '4px',
                    '&.Mui-checked': {
                      color: '#34D399',
                    },
                  },
                  '& .MuiFormControlLabel-label': {
                    color: isDark ? 'white' : '#0F172A',
                    fontWeight: 500,
                    fontSize: '0.8125rem',
                  },
                }}
              >
                <FormControlLabel
                  value='available'
                  control={<Radio size='small' />}
                  label='Available'
                />
                <FormControlLabel
                  value='unavailable'
                  control={<Radio size='small' />}
                  label='Unavailable'
                />
              </RadioGroup>
            </CompactCard>

            {/* Contact */}
            <CompactCard gradient='linear-gradient(90deg, #F59E0B 0%, #EAB308 100%)'>
              <Typography
                variant='subtitle1'
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: isDark ? 'white' : '#0F172A',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '0.9375rem',
                }}
              >
                <Phone sx={{ fontSize: 16 }} /> Contact Details
              </Typography>
              <CompactTextField
                {...register('telNo')}
                label='Telephone Number'
                error={!!errors.telNo}
                helperText={errors.telNo?.message}
              />
            </CompactCard>

            {/* Notifications */}
            <CompactCard gradient='linear-gradient(90deg, #EC4899 0%, #BE185D 100%)'>
              <Typography
                variant='subtitle1'
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: isDark ? 'white' : '#0F172A',
                  fontSize: '0.9375rem',
                }}
              >
                Message Notifications
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <NotificationSwitch
                  icon={<Email sx={{ fontSize: 16, color: '#60A5FA' }} />}
                  label='Send Email Notifications'
                  checked={watchedValues.emailNotifications}
                  onChange={(_, checked) => setValue('emailNotifications', checked)}
                >
                  <CompactTextField
                    {...register('emailAddress')}
                    label='Email Address'
                    error={!!errors.emailAddress}
                    helperText={errors.emailAddress?.message}
                  />
                </NotificationSwitch>

                <Divider
                  sx={{
                    borderColor: isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(226, 232, 240, 0.8)',
                  }}
                />

                <NotificationSwitch
                  icon={<Sms sx={{ fontSize: 16, color: '#10B981' }} />}
                  label='Send SMS Notifications'
                  checked={watchedValues.smsNotifications}
                  onChange={(_, checked) => setValue('smsNotifications', checked)}
                >
                  <CompactTextField {...register('smsNumber')} label='SMS Number' />
                </NotificationSwitch>
              </Box>
            </CompactCard>

            {/* Action Buttons */}
            <Box className='flex gap-3 flex-wrap'>
              <button
                type='submit'
                disabled={saving || !isDirty}
                className={`
                    flex items-center px-5 py-2 text-white font-semibold text-xs
                    bg-gradient-to-r from-blue-400 to-green-400
                    rounded-[5px] transition-all duration-150
                    disabled:opacity-60 disabled:cursor-not-allowed
                    shadow
                    `}
              >
                {saving ? (
                  <CircularProgress size={14} color='inherit' className='mr-2' />
                ) : (
                  <Save sx={{ fontSize: 16, marginRight: 6 }} />
                )}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>

              <button
                type='button'
                onClick={() => navigate('/availability')}
                className={`
                    flex items-center px-5 py-2 font-semibold text-xs
                    border border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400
                    rounded-[5px] transition-colors duration-150
                    hover:border-red-400 hover:bg-red-50 hover:text-red-500
                `}
              >
                Cancel
              </button>
            </Box>
          </Box>

          {/* Right Column (Preview) */}
          <PreviewCard formData={watchedValues} />
        </Box>
      </form>
    </Box>
  );
};

export default AvailabilityDetailPage;
