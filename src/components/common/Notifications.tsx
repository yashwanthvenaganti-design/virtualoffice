import React from 'react';
import { IconButton, Badge, useTheme, alpha } from '@mui/material';
import { NotificationsNone as NotificationsIcon } from '@mui/icons-material';

interface NotificationsProps {
  count: number;
  onClick?: () => void;
  maxCount?: number;
}

const Notifications: React.FC<NotificationsProps> = ({ count, onClick, maxCount = 99 }) => {
  const theme = useTheme();

  return (
    <IconButton
      size='large'
      onClick={onClick}
      sx={{
        color: theme.palette.text.secondary,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          color: theme.palette.primary.main,
        },
      }}
    >
      <Badge badgeContent={count > 0 ? count : null} color='error' max={maxCount}>
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};

export default Notifications;
