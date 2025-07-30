import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

interface LogoProps {
  companyName?: string;
  showIcon?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({
  companyName = 'alldayPA',
  showIcon = true,
  size = 'medium',
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const sizes = {
    small: { logo: 24, text: '1rem' },
    medium: { logo: 32, text: '1.25rem' },
    large: { logo: 48, text: '1.5rem' },
  };

  const currentSize = sizes[size];

  const handleNavigate = () => {
    navigate('/home', { replace: true });
  };

  return (
    <Box className={clsx('flex items-center mx-2')} onClick={handleNavigate}>
      {showIcon && (
        <img
          src='https://virtualoffice.dev.adhkistaging.com/static/img/adp-logo-white.png'
          alt='alldayPA logo'
          style={{
            height: `${currentSize.logo}px`,
            width: 'auto',
            marginRight: '8px',
            filter: 'brightness(0.8)',
          }}
        />
      )}
      {/* <Typography
        variant='h6'
        component='div'
        sx={{
          fontWeight: 700,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: currentSize.text,
        }}
      >
        allday<span style={{ color: theme.palette.secondary.main }}>PA</span>
      </Typography> */}
    </Box>
  );
};

export default Logo;
