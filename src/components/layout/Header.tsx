import React, { useState } from 'react';
import { AppBar, Toolbar, Box, useTheme, alpha } from '@mui/material';
import SearchBar from '../common/SearchBar';
import Logo from '../common/Logo';
import Notifications from '../common/Notifications';
import UserMenu from '../common/UserMenu';

interface User {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface HeaderProps {
  user?: User;
  onSearch?: (query: string) => void;
  onLogout?: () => void;
  onUserSettings?: () => void;
  onNotificationClick?: () => void;
  notifications?: number;
}

const Header: React.FC<HeaderProps> = ({
  user = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'admin',
  },
  onSearch,
  onLogout,
  onUserSettings,
  onNotificationClick,
  notifications = 0,
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar
        sx={{ minHeight: '64px !important', px: 3 }}
        className='flex flex-row justify-between'
      >
        <Box className='flex items-center justify-start gap-1 w-full'>
          <Logo />

          <SearchBar value={searchQuery} onChange={handleSearchChange} onSearch={onSearch} />
        </Box>

        <Box className='flex items-center justify-end gap-1 w-full '>
          <Notifications count={notifications} onClick={onNotificationClick} />
          <UserMenu user={user} onLogout={onLogout} onUserSettings={onUserSettings} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
