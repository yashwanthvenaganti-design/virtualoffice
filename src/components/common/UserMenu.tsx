import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, Divider, ListItemIcon, ListItemText } from '@mui/material';
import {
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Person as PersonIcon,
  HelpOutline as HelpIcon,
  Brightness4 as ThemeIcon,
} from '@mui/icons-material';
import { useTheme } from '../../theme/ThemeContext';

interface User {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface UserMenuProps {
  user: User;
  onLogout?: () => void;
  onUserSettings?: () => void;
  onProfileClick?: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout, onUserSettings, onProfileClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    onLogout?.();
  };

  const handleUserSettings = () => {
    handleUserMenuClose();
    onUserSettings?.();
  };

  const handleProfileClick = () => {
    handleUserMenuClose();
    onProfileClick?.();
  };

  const handleThemeToggle = () => {
    toggleTheme();
    handleUserMenuClose();
  };

  const getRoleColor = (role: string) => {
    const baseClasses =
      'inline-flex px-3 py-0.5 rounded-lg text-xs font-semibold uppercase tracking-wide';
    switch (role?.toLowerCase()) {
      case 'admin':
        return `${baseClasses} bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50`;
      case 'manager':
        return `${baseClasses} bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50`;
      case 'user':
        return `${baseClasses} bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50`;
      case 'guest':
        return `${baseClasses} bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/50`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700`;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatRole = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  };

  const getStatusDot = () => {
    return (
      <div className='absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-header-dark-bg rounded-full shadow-lg animate-pulse'></div>
    );
  };

  return (
    <>
      <button
        onClick={handleUserMenuOpen}
        className={`
          flex items-center gap-3 px-3 py-0.5 rounded-xl transition-all duration-200 group
          border-2 focus:outline-none focus:ring-2 focus:ring-primary-500/20
          border-header-light-border bg-header-light-surface hover:bg-header-light-hover hover:border-header-light-searchFocus hover:scale-105
          dark:border-header-dark-border dark:bg-header-dark-surface dark:hover:bg-header-dark-hover dark:hover:border-header-dark-searchFocus
        `}
      >
        <div className='relative'>
          <Avatar
            src={user.avatar}
            className='w-9 h-9 shadow-lg ring-2 ring-white/20 dark:ring-gray-700/20'
            sx={{
              backgroundColor: 'transparent',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'white',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            {getInitials(user.name)}
          </Avatar>
          {getStatusDot()}
        </div>

        <div className='hidden sm:block text-left'>
          <div
            className={`
            text-sm font-semibold leading-tight transition-colors duration-200
            text-header-light-text dark:text-header-dark-text
          `}
          >
            {user.name}
          </div>
          <div className='mt-1'>
            <span className={getRoleColor(user.role)}>{formatRole(user.role)}</span>
          </div>
        </div>

        <ArrowDownIcon
          className={`
            transition-all duration-200 ml-1
            ${anchorEl ? 'rotate-180' : 'rotate-0'}
            text-header-light-textMuted group-hover:text-header-light-text
            dark:text-header-dark-textMuted dark:group-hover:text-header-dark-text
          `}
          sx={{ fontSize: 16 }}
        />
      </button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
        onClick={handleUserMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          className: `
            mt-2 min-w-[300px] backdrop-blur-xl border-2 transition-all duration-200
            bg-header-light-surface/98 border-header-light-border shadow-2xl
            dark:bg-header-dark-surface/98 dark:border-header-dark-border dark:shadow-2xl
          `,
          sx: {
            borderRadius: '16px',
            boxShadow: isDark
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(51, 65, 85, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            '& .MuiMenuItem-root': {
              borderRadius: '10px',
              margin: '4px 16px',
              padding: '12px 16px',
              fontSize: '0.875rem',
              fontWeight: 500,
              minHeight: 'auto',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)',
                transform: 'translateX(4px)',
              },
            },
          },
        }}
      >
        {/* User Info Header */}
        <div
          className={`
          px-6 py-5 border-b-2 transition-all duration-200
          border-header-light-border bg-header-light-bg/50
          dark:border-header-dark-border dark:bg-header-dark-bg/50
        `}
        >
          <div className='flex items-center gap-4'>
            <div className='relative'>
              <Avatar
                src={user.avatar}
                className='w-14 h-14 shadow-xl ring-4 ring-white/30 dark:ring-gray-700/30'
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                {getInitials(user.name)}
              </Avatar>
              {getStatusDot()}
            </div>
            <div className='flex-1 min-w-0'>
              <div
                className={`
                font-bold text-base transition-colors duration-200
                text-header-light-text dark:text-header-dark-text
              `}
              >
                {user.name}
              </div>
              <div
                className={`
                text-sm truncate mt-1 transition-colors duration-200
                text-header-light-textSecondary dark:text-header-dark-textSecondary
              `}
              >
                {user.email}
              </div>
              <div className='mt-3'>
                <span className={getRoleColor(user.role)}>{formatRole(user.role)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className='py-2'>
          <MenuItem onClick={handleProfileClick}>
            <ListItemIcon>
              <PersonIcon
                sx={{
                  fontSize: 20,
                  color: isDark ? '#CBD5E1' : '#475569',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary='View Profile'
              sx={{
                '& .MuiTypography-root': {
                  color: isDark ? '#F8FAFC' : '#0F172A',
                  fontWeight: 600,
                },
              }}
            />
          </MenuItem>

          <MenuItem onClick={handleUserSettings}>
            <ListItemIcon>
              <SettingsIcon
                sx={{
                  fontSize: 20,
                  color: isDark ? '#CBD5E1' : '#475569',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary='Account Settings'
              sx={{
                '& .MuiTypography-root': {
                  color: isDark ? '#F8FAFC' : '#0F172A',
                  fontWeight: 600,
                },
              }}
            />
          </MenuItem>

          <MenuItem onClick={handleThemeToggle}>
            <ListItemIcon>
              <ThemeIcon
                sx={{
                  fontSize: 20,
                  color: isDark ? '#CBD5E1' : '#475569',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
              sx={{
                '& .MuiTypography-root': {
                  color: isDark ? '#F8FAFC' : '#0F172A',
                  fontWeight: 600,
                },
              }}
            />
          </MenuItem>

          <MenuItem onClick={() => console.log('Help clicked')}>
            <ListItemIcon>
              <HelpIcon
                sx={{
                  fontSize: 20,
                  color: isDark ? '#CBD5E1' : '#475569',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary='Help & Support'
              sx={{
                '& .MuiTypography-root': {
                  color: isDark ? '#F8FAFC' : '#0F172A',
                  fontWeight: 600,
                },
              }}
            />
          </MenuItem>
        </div>

        <Divider
          sx={{
            margin: '8px 20px',
            borderColor: isDark ? 'rgba(51, 65, 85, 0.8)' : 'rgba(226, 232, 240, 0.8)',
            borderWidth: '1px',
          }}
        />

        <div className='pb-2'>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon
                sx={{
                  fontSize: 20,
                  color: '#EF4444',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary='Sign Out'
              sx={{
                '& .MuiTypography-root': {
                  color: '#EF4444',
                  fontWeight: 600,
                },
              }}
            />
          </MenuItem>
        </div>
      </Menu>
    </>
  );
};

export default UserMenu;
