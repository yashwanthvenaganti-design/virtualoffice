import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotifications } from '../../hooks/useNotifications';
import { useTheme } from '../../theme/ThemeContext';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
  };

  const handleNotificationClick = () => {
    console.log('Notification clicked');
    // TODO: Implement your notification logic here
    markAllAsRead();
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className='fixed top-0 left-0 right-0 z-50 h-16'>
        <Header
          user={headerUser}
          onSearch={handleSearch}
          onLogout={handleLogout}
          onUserSettings={handleUserSettings}
          onProfileClick={handleProfileClick}
          onNotificationClick={handleNotificationClick}
          notifications={unreadCount}
        />
      </header>

      <div className='fixed top-16 left-0 right-0 bottom-0 grid grid-cols-[auto_1fr]'>
        <div className='h-full overflow-hidden relative'>
          <Sidebar
            currentPath={location.pathname}
            onNavigate={handleNavigate}
            isDark={isDark}
            isCollapsed={sidebarCollapsed}
          />
        </div>

        <main className='overflow-y-auto overflow-x-auto'>
          <div className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} w-full p-4`}>{children}</div>
        </main>
      </div>

      <button
        onClick={toggleSidebar}
        className={`hidden lg:flex p-0.5 rounded-lg transition-all duration-200 z-[70] 
                   focus:outline-none fixed top-[4.75rem] items-center justify-center
                   backdrop-blur-xl border shadow-lg hover:shadow-xl
                   ${sidebarCollapsed ? 'left-[3.5rem]' : 'left-[15.5rem]'}
                   ${
                     isDark
                       ? 'bg-gray-800/90 border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-700/90'
                       : 'bg-white/90 border-gray-200/50 text-gray-600 hover:text-gray-900 hover:bg-white/90'
                   }`}
        style={{ transform: 'translateX(-50%)' }}
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {sidebarCollapsed ? (
          <ChevronRight sx={{ fontSize: 22 }} />
        ) : (
          <ChevronLeft sx={{ fontSize: 22 }} />
        )}
      </button>
    </div>
  );
};

export default MainLayout;
