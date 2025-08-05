import React, { ReactNode } from 'react';
import { Box, FormControlLabel, Switch, Typography, useTheme } from '@mui/material';

interface NotificationSwitchProps {
  icon: ReactNode;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  children?: ReactNode;
}

const NotificationSwitch: React.FC<NotificationSwitchProps> = ({
  icon,
  label,
  checked,
  onChange,
  children,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={onChange}
            size='small'
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#34D399',
                '& + .MuiSwitch-track': {
                  backgroundColor: '#059669',
                },
              },
              '& .MuiSwitch-track': {
                backgroundColor: isDark ? '#4B5563' : '#D1D5DB',
              },
            }}
          />
        }
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {icon}
            <Typography
              sx={{
                color: isDark ? 'white' : '#0F172A',
                fontWeight: 500,
                fontSize: '0.875rem',
              }}
            >
              {label}
            </Typography>
          </Box>
        }
        sx={{ mb: checked && children ? 1.5 : 0 }}
      />
      {checked && children && <Box sx={{ ml: 3 }}>{children}</Box>}
    </Box>
  );
};

export default NotificationSwitch;
