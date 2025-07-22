import React from 'react';
import { IconButton, Badge } from '@mui/material';
import { NotificationsNone as NotificationsIcon } from '@mui/icons-material';

interface NotificationsProps {
  count: number;
  onClick?: () => void;
  maxCount?: number;
}

const Notifications: React.FC<NotificationsProps> = ({ count, onClick, maxCount = 99 }) => {
  return (
    <IconButton
      size='large'
      onClick={onClick}
      className='text-muted hover:text-foreground hover:bg-surface-alt transition-colors duration-200'
      sx={{
        color: 'rgb(var(--color-text-secondary))',
        '&:hover': {
          backgroundColor: 'rgba(var(--color-primary), 0.08)',
          color: 'rgb(var(--color-primary))',
        },
      }}
    >
      <Badge
        badgeContent={count > 0 ? count : null}
        color='error'
        max={maxCount}
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: 'rgb(var(--color-error))',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.75rem',
          },
        }}
      >
        <NotificationsIcon sx={{ fontSize: 22 }} />
      </Badge>
    </IconButton>
  );
};

export default Notifications;
