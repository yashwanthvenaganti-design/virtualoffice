import React from 'react';
import { Box, Typography, Divider, Button, useTheme } from '@mui/material';
import { Phone, Email, Sms, CheckCircle, Cancel, Edit } from '@mui/icons-material';
import CompactCard from './CompactCard';

export interface PreviewFormData {
  statusName: string;
  availability: string;
  telNo: string;
  emailNotifications: boolean;
  emailAddress?: string;
  smsNotifications: boolean;
  smsNumber?: string;
}

interface PreviewCardProps {
  formData: PreviewFormData;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ formData }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <CompactCard
      gradient='linear-gradient(90deg, #A855F7 0%, #EC4899 100%)'
      sx={{ position: 'sticky', top: 2 }}
    >
      <Typography
        variant='subtitle1'
        sx={{
          mb: 2,
          fontWeight: 600,
          color: isDark ? 'white' : '#0F172A',
          fontSize: '1rem',
        }}
      >
        PA Preview
      </Typography>
      <Box
        sx={{
          backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(241, 245, 249, 0.8)',
          borderRadius: 1,
          p: 2,
          border: isDark
            ? '1px solid rgba(148, 163, 184, 0.1)'
            : '1px solid rgba(226, 232, 240, 0.8)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 1.5,
          }}
        >
          <Box>
            <Typography
              variant='subtitle2'
              sx={{
                fontWeight: 600,
                color: isDark ? 'white' : '#0F172A',
                mb: 0.5,
                fontSize: '0.875rem',
              }}
            >
              John Doe
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
              {formData.availability === 'available' ? (
                <CheckCircle sx={{ fontSize: 14, color: '#22C55E' }} />
              ) : (
                <Cancel sx={{ fontSize: 14, color: '#EF4444' }} />
              )}
              <Typography
                variant='caption'
                sx={{
                  color: formData.availability === 'available' ? '#22C55E' : '#EF4444',
                  fontWeight: 500,
                  textTransform: 'capitalize',
                  fontSize: '0.75rem',
                }}
              >
                {formData.availability}
              </Typography>
            </Box>
            <Typography
              variant='caption'
              sx={{
                color: isDark ? '#94A3B8' : '#64748B',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '0.75rem',
              }}
            >
              <Phone sx={{ fontSize: 12 }} /> {formData.telNo || 'No phone number'}
            </Typography>
          </Box>
          <Button
            variant='outlined'
            size='small'
            startIcon={<Edit sx={{ fontSize: 14 }} />}
            sx={{
              borderColor: 'rgba(245, 158, 11, 0.5)',
              color: '#F59E0B',
              fontSize: '0.6875rem',
              minWidth: 'auto',
              px: 1,
              py: 0.25,
              '&:hover': {
                borderColor: '#F59E0B',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
              },
            }}
          >
            Edit
          </Button>
        </Box>
        <Divider
          sx={{
            borderColor: isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(226, 232, 240, 0.8)',
            my: 1,
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography
            variant='caption'
            sx={{
              color: isDark ? '#94A3B8' : '#64748B',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.75rem',
            }}
          >
            <Email
              sx={{
                fontSize: 12,
                color: formData.emailNotifications ? '#60A5FA' : isDark ? '#4B5563' : '#9CA3AF',
              }}
            />{' '}
            Email:{' '}
            {formData.emailNotifications && formData.emailAddress ? (
              formData.emailAddress
            ) : (
              <span style={{ color: isDark ? '#6B7280' : '#9CA3AF' }}>Disabled</span>
            )}
          </Typography>
          <Typography
            variant='caption'
            sx={{
              color: isDark ? '#94A3B8' : '#64748B',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.75rem',
            }}
          >
            <Sms
              sx={{
                fontSize: 12,
                color: formData.smsNotifications ? '#10B981' : isDark ? '#4B5563' : '#9CA3AF',
              }}
            />{' '}
            SMS:{' '}
            {formData.smsNotifications && formData.smsNumber ? (
              formData.smsNumber
            ) : (
              <span style={{ color: isDark ? '#6B7280' : '#9CA3AF' }}>Disabled</span>
            )}
          </Typography>
        </Box>
      </Box>
    </CompactCard>
  );
};

export default PreviewCard;
