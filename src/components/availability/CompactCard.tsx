import React, { type ReactNode } from 'react';
import { Paper, useTheme } from '@mui/material';

interface CompactCardProps {
  children: ReactNode;
  gradient?: string;
  sx?: object;
}

const CompactCard: React.FC<CompactCardProps> = ({ children, gradient, sx = {} }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <Paper
      elevation={0}
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, #1E293B 0%, #334155 100%)'
          : 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
        border: isDark
          ? '1px solid rgba(148, 163, 184, 0.1)'
          : '1px solid rgba(226, 232, 240, 0.8)',
        borderRadius: 1.5,
        p: 2.5,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isDark ? '0 1px 3px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
        '&::before': gradient
          ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: gradient,
            }
          : {},
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
};

export default CompactCard;
