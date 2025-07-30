import React, { useState } from 'react';
import {
  Home,
  CalendarToday,
  Mail,
  PhoneAndroid,
  LocationOn,
  Chat,
  Description,
  Edit,
  Notifications,
  People,
  BarChart,
  HelpOutline,
  Star,
  Menu,
  Close,
} from '@mui/icons-material';
import clsx from 'clsx';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  className?: string;
  currentPath?: string;
  onNavigate?: (path: string) => void;
  isDark?: boolean;
  isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  currentPath = '/home',
  onNavigate,
  isDark = false,
  isCollapsed = false,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    { icon: <Home sx={{ fontSize: 20 }} />, label: 'Home', path: '/home' },
    {
      icon: <CalendarToday sx={{ fontSize: 20 }} />,
      label: 'Your availability',
      path: '/availability',
    },
    { icon: <Mail sx={{ fontSize: 20 }} />, label: 'Your messages', path: '/messages' },
    { icon: <PhoneAndroid sx={{ fontSize: 20 }} />, label: 'Your app devices', path: '/devices' },
    { icon: <LocationOn sx={{ fontSize: 20 }} />, label: 'Addresses', path: '/addresses' },
    { icon: <Chat sx={{ fontSize: 20 }} />, label: 'Greetings', path: '/greetings' },
    { icon: <Description sx={{ fontSize: 20 }} />, label: 'Invoices', path: '/invoices' },
    { icon: <Edit sx={{ fontSize: 20 }} />, label: 'Modify', path: '/modify' },
    { icon: <Notifications sx={{ fontSize: 20 }} />, label: 'Notify your PA', path: '/notify-pa' },
    { icon: <People sx={{ fontSize: 20 }} />, label: 'Staff', path: '/staff' },
    { icon: <BarChart sx={{ fontSize: 20 }} />, label: 'Statistics', path: '/statistics' },
    { icon: <HelpOutline sx={{ fontSize: 20 }} />, label: 'Support', path: '/support' },
    { icon: <Star sx={{ fontSize: 20 }} />, label: 'VIPs', path: '/vips' },
  ];

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobile}
        className={clsx(
          'lg:hidden fixed top-[4.25rem] left-1 z-[60] p-1 rounded-md transition-all duration-200',
          'focus:outline-none',
          isDark
            ? 'bg-gray-800/90 text-white hover:bg-gray-700/90 border border-gray-700'
            : 'bg-white/90 text-gray-900 hover:bg-gray-50/90 border border-gray-200 shadow-lg',
          'backdrop-blur-xl'
        )}
        aria-label='Toggle mobile menu'
      >
        {isMobileOpen ? <Close sx={{ fontSize: 20 }} /> : <Menu sx={{ fontSize: 20 }} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className='lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-30'
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'h-full flex flex-col border-r transition-all duration-300 ease-in-out relative',
          // Desktop widths (lg and up)
          {
            'lg:w-16': isCollapsed,
            'lg:w-64': !isCollapsed,
          },
          // Mobile and tablet behavior
          isMobileOpen
            ? `fixed inset-y-0 left-0 z-40 translate-x-0 ${isCollapsed ? 'w-16' : 'w-48'}`
            : 'fixed inset-y-0 left-0 z-40 -translate-x-full w-0',
          // Keep relative layout for desktop
          'lg:relative lg:translate-x-0',
          // Dark/light theme
          isDark
            ? 'bg-gray-900/95 border-gray-700/50 lg:bg-gray-900 lg:backdrop-blur-0 backdrop-blur-xl'
            : 'bg-white/95 border-gray-200/50 lg:bg-white lg:backdrop-blur-0 backdrop-blur-xl',

          className
        )}
      >
        {/* Navigation */}
        <nav
          className={clsx(
            'flex-1 lg:p-2 space-y-1 overflow-y-auto scrollbar-thin pt-2 min-h-0',
            isMobileOpen && 'p-2'
          )}
        >
          {navigationItems?.map(item => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={currentPath === item.path}
              isCollapsed={isCollapsed}
              isDark={isDark}
              onClick={() => {
                onNavigate?.(item.path);
                closeMobile();
              }}
            />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
