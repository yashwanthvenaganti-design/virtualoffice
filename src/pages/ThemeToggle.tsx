import React from 'react';
import { IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '../theme/ThemeContext';
const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      size='medium'
      sx={{
        width: 40,
        height: 40,
        borderRadius: '10px',
        border: '1px solid',
        borderColor: isDark ? 'rgba(156, 163, 175, 0.3)' : 'rgba(209, 213, 219, 0.5)',
        backgroundColor: isDark ? 'rgba(55, 65, 81, 0.5)' : 'rgba(249, 250, 251, 0.8)',
        color: isDark ? '#f3f4f6' : '#374151',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: isDark ? 'rgba(156, 163, 175, 0.5)' : 'rgba(156, 163, 175, 0.7)',
          backgroundColor: isDark ? 'rgba(75, 85, 99, 0.6)' : 'rgba(243, 244, 246, 0.9)',
          color: isDark ? '#ffffff' : '#1f2937',
        },
        '&:active': {
          transform: 'scale(0.96)',
        },
      }}
    >
      {isDark ? <DarkMode sx={{ fontSize: 18 }} /> : <LightMode sx={{ fontSize: 18 }} />}
    </IconButton>
  );
};

export default ThemeToggle;
