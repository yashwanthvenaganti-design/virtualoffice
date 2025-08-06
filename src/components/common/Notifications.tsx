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
      size='medium'
      onClick={onClick}
      className={`
        !w-10 !h-10 !rounded-xl !border-2 !transition-all !duration-200 !relative
        focus:!outline-none focus:!ring-2 focus:!ring-primary-500/20
        !border-header-light-border !bg-header-light-surface !text-header-light-textSecondary
        hover:!border-header-light-searchFocus hover:!bg-header-light-hover hover:!text-header-light-text hover:!scale-105
        dark:!border-header-dark-border dark:!bg-header-dark-surface dark:!text-header-dark-textSecondary
        dark:hover:!border-header-dark-searchFocus dark:hover:!bg-header-dark-hover dark:hover:!text-header-dark-text
        active:!scale-95
      `}
      sx={{
        position: 'relative',
        overflow: 'visible',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          borderRadius: '12px',
        },
        '&:hover::before': {
          opacity: count > 0 ? 1 : 0.5,
        },
      }}
    >
      <Badge
        badgeContent={count > 0 ? count : null}
        color='error'
        max={maxCount}
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: '#EF4444',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.7rem',
            minWidth: '18px',
            height: '18px',
            borderRadius: '9px',
            border: '2px solid',
            borderColor: 'var(--header-bg)',
            boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
            animation: count > 0 ? 'pulse 2s infinite' : 'none',
          },
          '& .MuiBadge-dot': {
            backgroundColor: '#EF4444',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            border: '2px solid white',
          },
        }}
      >
        <div className='relative z-10 flex items-center justify-center'>
          <NotificationsIcon
            sx={{
              fontSize: 20,
              filter: count > 0 ? 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.3))' : 'none',
            }}
          />
        </div>
      </Badge>

      {/* Notification pulse animation for active notifications */}
      {/* {count > 0 && (
        <div className='absolute inset-0 rounded-xl animate-ping opacity-75'>
          <div className='w-full h-full rounded-xl bg-red-400/20' />
        </div>
      )} */}
    </IconButton>
  );
};

export default Notifications;
