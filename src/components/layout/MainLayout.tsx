import React from 'react';
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
    <div className='min-h-screen bg-background'>
      <Header
        user={headerUser}
        onSearch={handleSearch}
        onLogout={handleLogout}
        onUserSettings={handleUserSettings}
        onProfileClick={handleProfileClick}
        onNotificationClick={handleNotificationClick}
        notifications={unreadCount}
      />

      {/* Main Content */}
      <main className='min-h-[calc(100vh-64px)] bg-background'>
        <div className='scrollbar-thin'>{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
