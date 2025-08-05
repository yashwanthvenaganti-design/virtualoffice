import React from 'react';
import { TextField, useTheme, type TextFieldProps } from '@mui/material';

type CompactTextFieldProps = TextFieldProps & {
  error?: boolean;
  helperText?: string;
};

const CompactTextField = React.forwardRef<HTMLInputElement, CompactTextFieldProps>(
  ({ label, error, helperText, sx = {}, ...props }, ref) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
      <TextField
        label={label}
        variant='outlined'
        size='small'
        fullWidth
        error={error}
        helperText={helperText}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(248, 250, 252, 0.8)',
            borderRadius: 1,
            fontSize: '0.875rem',
            '& fieldset': {
              borderColor: isDark ? 'rgba(148, 163, 184, 0.3)' : 'rgba(203, 213, 225, 0.8)',
            },
            '&:hover fieldset': {
              borderColor: isDark ? 'rgba(96, 165, 250, 0.5)' : 'rgba(59, 130, 246, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: isDark ? '#60A5FA' : '#3B82F6',
            },
            '& input': {
              color: isDark ? 'white' : '#0F172A',
              fontSize: '0.875rem',
            },
          },
          '& .MuiInputLabel-root': {
            color: isDark ? '#94A3B8' : '#64748B',
            fontSize: '0.875rem',
            '&.Mui-focused': {
              color: isDark ? '#60A5FA' : '#3B82F6',
            },
          },
          '& .MuiFormHelperText-root': {
            color: '#EF4444',
            fontSize: '0.75rem',
          },
          ...sx,
        }}
        inputRef={ref}
        {...props}
      />
    );
  }
);

export default CompactTextField;
