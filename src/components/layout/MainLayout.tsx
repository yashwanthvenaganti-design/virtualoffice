import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotifications } from '../../hooks/useNotifications';
import { useTheme } from '../../theme/ThemeContext';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const { unreadCount, markAllAsRead } = useNotifications();

  const headerUser = user
    ? {
        name: user.username,
        email: user.email ?? '',
        role: user.role ?? '',
        avatar: user.avatar ?? '',
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

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Fixed Header */}
      <div className='fixed top-0 left-0 right-0 z-40'>
        <Header
          user={headerUser}
          onSearch={handleSearch}
          onLogout={handleLogout}
          onUserSettings={handleUserSettings}
          onProfileClick={handleProfileClick}
          onNotificationClick={handleNotificationClick}
          notifications={unreadCount}
        />
      </div>

      {/* Main Content */}
      <main className='lg:ml-64 pt-16 min-h-screen'>
        {/* Sidebar */}
        <Sidebar currentPath={location.pathname} onNavigate={handleNavigate} isDark={isDark} />

        <div className={`p-0 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} min-h-[calc(100vh-64px)]`}>
          <div className='scrollbar-thin'>{children}</div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
