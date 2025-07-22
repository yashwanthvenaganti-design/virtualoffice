import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, Divider, ListItemIcon, ListItemText } from '@mui/material';
import {
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

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

  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'manager':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'user':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'guest':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
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

  return (
    <>
      <div
        onClick={handleUserMenuOpen}
        className='flex items-center gap-3 cursor-pointer px-3 py-2 rounded-xl transition-all duration-200 hover:bg-surface-alt'
      >
        <Avatar
          src={user.avatar}
          className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm'
          sx={{
            backgroundColor: 'transparent',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          }}
        >
          {getInitials(user.name)}
        </Avatar>

        <div className='hidden sm:block'>
          <div className='text-sm font-semibold text-foreground leading-tight'>{user.name}</div>
          <div className='flex items-center gap-1.5 mt-0.5'>
            <span
              className={`inline-flex px-2 py-0.5 rounded-md text-2xs font-medium ${getRoleColor(user.role)}`}
            >
              {formatRole(user.role)}
            </span>
          </div>
        </div>

        <ArrowDownIcon
          className={`text-muted transition-transform duration-200 ${
            anchorEl ? 'rotate-180' : 'rotate-0'
          }`}
          sx={{ fontSize: 16 }}
        />
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
        onClick={handleUserMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          className: 'glass border border-border mt-2 min-w-[240px]',
          sx: {
            backgroundColor: 'transparent',
            '& .MuiMenuItem-root': {
              borderRadius: '8px',
              margin: '4px 8px',
              padding: '8px 12px',
              '&:hover': {
                backgroundColor: 'rgba(var(--color-primary), 0.08)',
              },
            },
          },
        }}
      >
        <div className='px-4 py-3 border-b border-border'>
          <div className='text-sm font-semibold text-foreground'>{user.name}</div>
          <div className='text-xs text-muted mt-1'>{user.email}</div>
          <div className='mt-2'>
            <span
              className={`inline-flex px-2 py-1 rounded-md text-2xs font-medium ${getRoleColor(user.role)}`}
            >
              {formatRole(user.role)}
            </span>
          </div>
        </div>

        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <PersonIcon
              sx={{
                fontSize: 18,
                color: 'rgb(var(--color-text-secondary))',
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary='Profile'
            sx={{
              '& .MuiTypography-root': {
                fontSize: '0.875rem',
                color: 'rgb(var(--color-text-primary))',
              },
            }}
          />
        </MenuItem>

        <MenuItem onClick={handleUserSettings}>
          <ListItemIcon>
            <SettingsIcon
              sx={{
                fontSize: 18,
                color: 'rgb(var(--color-text-secondary))',
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary='Account Settings'
            sx={{
              '& .MuiTypography-root': {
                fontSize: '0.875rem',
                color: 'rgb(var(--color-text-primary))',
              },
            }}
          />
        </MenuItem>

        <Divider sx={{ margin: '8px 16px', borderColor: 'rgb(var(--color-border))' }} />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon
              sx={{
                fontSize: 18,
                color: 'rgb(var(--color-error))',
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary='Sign out'
            sx={{
              '& .MuiTypography-root': {
                fontSize: '0.875rem',
                color: 'rgb(var(--color-error))',
              },
            }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
