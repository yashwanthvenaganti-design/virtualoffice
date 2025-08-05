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
  isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  currentPath = '/home',
  onNavigate,
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
          'lg:hidden fixed top-[4.25rem] left-1 z-50 p-2 rounded-xl transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
          'bg-sidebar-light-surface text-sidebar-light-text border border-sidebar-light-border shadow-card',
          'dark:bg-sidebar-dark-surface dark:text-sidebar-dark-text dark:border-sidebar-dark-border dark:shadow-card-dark',
          'hover:bg-sidebar-light-hover dark:hover:bg-sidebar-dark-hover',
          'backdrop-blur-xl'
        )}
        aria-label='Toggle mobile menu'
      >
        {isMobileOpen ? <Close sx={{ fontSize: 20 }} /> : <Menu sx={{ fontSize: 20 }} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30'
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'h-full flex flex-col transition-all duration-300 ease-in-out relative',
          'border-r border-sidebar-light-border dark:border-sidebar-dark-border',
          // Desktop widths (lg and up)
          {
            'lg:w-16': isCollapsed,
            'lg:w-64': !isCollapsed,
          },
          // Mobile and tablet behavior
          isMobileOpen
            ? `fixed inset-y-0 left-0 z-40 translate-x-0 ${isCollapsed ? 'w-16' : 'w-64'} shadow-2xl`
            : 'fixed inset-y-0 left-0 z-40 -translate-x-full w-0',
          'lg:relative lg:translate-x-0 lg:shadow-none',
          'bg-sidebar-light-bg dark:bg-sidebar-dark-bg',
          'lg:backdrop-blur-0 backdrop-blur-xl',
          className
        )}
      >
        {/* Navigation */}
        <nav
          className={clsx(
            'flex-1 px-3 py-2 space-y-1.5 overflow-y-auto min-h-0',
            // Custom scrollbar styling
            'scrollbar-thin scrollbar-track-transparent',
            'scrollbar-thumb-sidebar-light-border hover:scrollbar-thumb-sidebar-light-textMuted',
            'dark:scrollbar-thumb-sidebar-dark-border dark:hover:scrollbar-thumb-sidebar-dark-textMuted'
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
              onClick={() => {
                onNavigate?.(item.path);
                closeMobile();
              }}
            />
          ))}
        </nav>

        {/* Sidebar Footer (optional) */}
        {!isCollapsed && (
          <div className='hidden lg:block px-4 py-4 border-t border-sidebar-light-border dark:border-sidebar-dark-border'>
            <div className='text-xs text-sidebar-light-textMuted dark:text-sidebar-dark-textMuted'>
              Personal Assistant
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
