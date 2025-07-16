import React from 'react';
import { Box, useTheme } from '@mui/material';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme();

  const currentUser = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'admin',
    avatar: undefined, // Add avatar URL if available
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search functionality
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Implement logout functionality
    // For example: redirect to login page, clear auth tokens, etc.
  };

  const handleUserSettings = () => {
    console.log('User settings clicked');
    // Implement navigation to user settings page
    // For example: navigate to /settings or open settings modal
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        user={currentUser}
        onSearch={handleSearch}
        onLogout={handleLogout}
        onUserSettings={handleUserSettings}
        notifications={3}
      />

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          backgroundColor: theme.palette.background.default,
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
