import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Business as BusinessIcon } from '@mui/icons-material';

interface LogoProps {
  companyName?: string;
  showIcon?: boolean;
}

const Logo: React.FC<LogoProps> = ({ companyName = 'alldayPA', showIcon = true }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
      {showIcon && (
        <BusinessIcon
          sx={{
            fontSize: 28,
            color: theme.palette.primary.main,
            mr: 1,
          }}
        />
      )}
      <Typography
        variant='h6'
        component='div'
        sx={{
          fontWeight: 700,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '1.25rem',
        }}
      >
        allday<span style={{ color: theme.palette.secondary.main }}>PA</span>
      </Typography>
    </Box>
  );
};

export default Logo;
