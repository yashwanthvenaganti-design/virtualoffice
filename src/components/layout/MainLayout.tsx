import React from 'react';
import { Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../hooks/useNotifications';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { unreadCount, markAllAsRead } = useNotifications();

  // Transform auth user to Header component user format
  const headerUser = user
    ? {
        name: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      }
    : undefined;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUserSettings = () => {
    navigate('/settings');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // TODO: Implement your search logic here
    // You could navigate to a search results page or filter current content
  };

  const handleNotificationClick = () => {
    console.log('Notification clicked');
    // TODO: Implement your notification logic here
    // You could open a notification panel or navigate to notifications page
    markAllAsRead(); // Mark all notifications as read when clicked
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
      <Header
        user={headerUser}
        onSearch={handleSearch}
        onLogout={handleLogout}
        onUserSettings={handleUserSettings}
        onNotificationClick={handleNotificationClick}
        notifications={unreadCount}
      />

      {/* Main Content */}
      <Box
        component='main'
        sx={{
          p: 3,
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: 'background.default',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
