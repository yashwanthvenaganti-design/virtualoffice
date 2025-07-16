import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Chip,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  KeyboardArrowDown as ArrowDownIcon,
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
  const theme = useTheme();
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
    switch (role.toLowerCase()) {
      case 'admin':
        return theme.palette.error.main;
      case 'user':
        return theme.palette.primary.main;
      case 'guest':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
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

  return (
    <>
      <Box
        onClick={handleUserMenuOpen}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          cursor: 'pointer',
          padding: '8px 12px',
          borderRadius: 2,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            width: 32,
            height: 32,
            backgroundColor: theme.palette.primary.main,
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          {getInitials(user.name)}
        </Avatar>

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography
            variant='body2'
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              lineHeight: 1.2,
            }}
          >
            {user.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Chip
              label={user.role}
              size='small'
              sx={{
                height: 18,
                fontSize: '0.6875rem',
                fontWeight: 600,
                backgroundColor: alpha(getRoleColor(user.role), 0.1),
                color: getRoleColor(user.role),
                '& .MuiChip-label': {
                  px: 1,
                },
              }}
            />
          </Box>
        </Box>

        <ArrowDownIcon
          sx={{
            fontSize: 16,
            color: theme.palette.text.secondary,
            transition: 'transform 0.2s ease-in-out',
            transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
        onClick={handleUserMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 8,
          sx: {
            mt: 1,
            minWidth: 240,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            '& .MuiMenuItem-root': {
              borderRadius: 1,
              mx: 1,
              my: 0.5,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
            },
          },
        }}
      >
        {/* User Info */}
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
            {user.name}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              color: theme.palette.text.secondary,
              fontSize: '0.75rem',
            }}
          >
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Menu Items */}
        <MenuItem onClick={handleUserSettings}>
          <ListItemIcon>
            <SettingsIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='User settings' />
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
