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
    const baseClasses = 'inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold';
    switch (role?.toLowerCase()) {
      case 'admin':
        return `${baseClasses} ${isDark ? 'bg-red-900/30 text-red-300 border border-red-800/50' : 'bg-red-100 text-red-700 border border-red-200'}`;
      case 'manager':
        return `${baseClasses} ${isDark ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50' : 'bg-blue-100 text-blue-700 border border-blue-200'}`;
      case 'user':
        return `${baseClasses} ${isDark ? 'bg-green-900/30 text-green-300 border border-green-800/50' : 'bg-green-100 text-green-700 border border-green-200'}`;
      case 'guest':
        return `${baseClasses} ${isDark ? 'bg-amber-900/30 text-amber-300 border border-amber-800/50' : 'bg-amber-100 text-amber-700 border border-amber-200'}`;
      default:
        return `${baseClasses} ${isDark ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-gray-100 text-gray-700 border border-gray-200'}`;
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
      <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full shadow-sm'></div>
    );
  };

  return (
    <>
      <button
        onClick={handleUserMenuOpen}
        className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group ${
          isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100/80'
        }`}
      >
        <div className='relative'>
          <Avatar
            src={user.avatar}
            className='w-9 h-9 shadow-md ring-2 ring-white/20'
            sx={{
              backgroundColor: 'transparent',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'white',
            }}
          >
            {getInitials(user.name)}
          </Avatar>
          {getStatusDot()}
        </div>

        <div className='hidden sm:block text-left'>
          <div
            className={`text-sm font-semibold leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {user.name}
          </div>
          <div className='mt-1'>
            <span className={getRoleColor(user.role)}>{formatRole(user.role)}</span>
          </div>
        </div>

        <ArrowDownIcon
          className={`transition-all duration-200 ${anchorEl ? 'rotate-180' : 'rotate-0'} ${
            isDark
              ? 'text-gray-400 group-hover:text-gray-300'
              : 'text-gray-500 group-hover:text-gray-700'
          }`}
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
          className: `mt-2 min-w-[280px] backdrop-blur-xl border ${
            isDark
              ? 'bg-gray-800/95 border-gray-600/60 shadow-2xl shadow-black/20'
              : 'bg-white/98 border-gray-300/80 shadow-2xl shadow-gray-900/15'
          }`,
          sx: {
            borderRadius: '12px',
            // Enhanced box shadow for better separation
            boxShadow: isDark
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(55, 65, 81, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            '& .MuiMenuItem-root': {
              borderRadius: '8px',
              margin: '2px 12px',
              padding: '10px 16px',
              fontSize: '0.875rem',
              fontWeight: 500,
              minHeight: 'auto',
              '&:hover': {
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.08)',
              },
            },
          },
        }}
      >
        {/* User Info Header */}
        <div
          className={`px-6 py-4 border-b ${
            isDark ? 'border-gray-600/50 bg-gray-800/30' : 'border-gray-200/70 bg-gray-50/40'
          }`}
        >
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <Avatar
                src={user.avatar}
                className={`w-12 h-12 ${
                  isDark ? 'shadow-lg shadow-black/20' : 'shadow-lg shadow-gray-900/15'
                }`}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'white',
                  border: isDark
                    ? '2px solid rgba(255, 255, 255, 0.1)'
                    : '2px solid rgba(255, 255, 255, 0.8)',
                }}
              >
                {getInitials(user.name)}
              </Avatar>
              {getStatusDot()}
            </div>
            <div className='flex-1 min-w-0'>
              <div className={`font-semibold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {user.name}
              </div>
              <div className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {user.email}
              </div>
              <div className='mt-2'>
                <span className={getRoleColor(user.role)}>{formatRole(user.role)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className='py-1'>
          <MenuItem onClick={handleProfileClick}>
            <ListItemIcon>
              <PersonIcon
                sx={{
                  fontSize: 20,
                  color: isDark ? '#9ca3af' : '#6b7280',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary='View Profile'
              sx={{
                '& .MuiTypography-root': {
                  color: isDark ? '#ffffff' : '#1f2937',
                  fontWeight: 500,
                },
              }}
            />
          </MenuItem>

          <MenuItem onClick={handleUserSettings}>
            <ListItemIcon>
              <SettingsIcon
                sx={{
                  fontSize: 20,
                  color: isDark ? '#9ca3af' : '#6b7280',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary='Account Settings'
              sx={{
                '& .MuiTypography-root': {
                  color: isDark ? '#ffffff' : '#1f2937',
                  fontWeight: 500,
                },
              }}
            />
          </MenuItem>

          <MenuItem onClick={handleThemeToggle}>
            <ListItemIcon>
              <ThemeIcon
                sx={{
                  fontSize: 20,
                  color: isDark ? '#9ca3af' : '#6b7280',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
              sx={{
                '& .MuiTypography-root': {
                  color: isDark ? '#ffffff' : '#1f2937',
                  fontWeight: 500,
                },
              }}
            />
          </MenuItem>

          <MenuItem onClick={() => console.log('Help clicked')}>
            <ListItemIcon>
              <HelpIcon
                sx={{
                  fontSize: 20,
                  color: isDark ? '#9ca3af' : '#6b7280',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary='Help & Support'
              sx={{
                '& .MuiTypography-root': {
                  color: isDark ? '#ffffff' : '#1f2937',
                  fontWeight: 500,
                },
              }}
            />
          </MenuItem>
        </div>

        <Divider
          sx={{
            margin: '8px 16px',
            borderColor: isDark ? 'rgba(75, 85, 99, 0.6)' : 'rgba(209, 213, 219, 0.8)',
            borderWidth: '1px',
          }}
        />

        <div>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon
                sx={{
                  fontSize: 20,
                  color: '#ef4444',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary='Sign Out'
              sx={{
                '& .MuiTypography-root': {
                  color: '#ef4444',
                  fontWeight: 500,
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
