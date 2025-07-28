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
  ChevronLeft,
  ChevronRight,
  Menu,
  Close,
} from '@mui/icons-material';
import clsx from 'clsx';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}

interface SidebarProps {
  className?: string;
  currentPath?: string;
  onNavigate?: (path: string) => void;
  isDark?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps & { isDark: boolean }> = ({
  icon,
  label,
  path,
  isActive = false,
  isCollapsed = false,
  onClick,
  isDark,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/20',
        {
          // Active state
          [isDark
            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
            : 'bg-blue-50 text-blue-600 border border-blue-200']: isActive,
          // Inactive state
          [isDark
            ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900']: !isActive,
          'justify-center': isCollapsed,
          'justify-start': !isCollapsed,
        }
      )}
      title={isCollapsed ? label : undefined}
    >
      <div className='flex-shrink-0'>{icon}</div>

      {!isCollapsed && (
        <span className='font-medium text-sm whitespace-nowrap overflow-hidden'>{label}</span>
      )}

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div
          className={clsx(
            'absolute left-full ml-2 px-2 py-1 rounded-md text-xs font-medium',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
            'pointer-events-none whitespace-nowrap z-30',
            isDark
              ? 'bg-gray-800 text-white border border-gray-600'
              : 'bg-white text-gray-900 border border-gray-200 shadow-lg'
          )}
        >
          {label}
        </div>
      )}
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  className,
  currentPath = '/home',
  onNavigate,
  isDark = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
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

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

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
          'lg:hidden fixed top-4 left-1 z-50 p-1 rounded-md transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/20',
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
          className='lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm'
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed left-0 h-full transition-all duration-300 ease-in-out m-0.5 z-40',
          'flex flex-col border-r',
          {
            // Desktop states
            'lg:translate-x-0': true,
            'lg:w-64': !isCollapsed,
            'lg:w-20': isCollapsed,
            // Mobile states
            'translate-x-0 w-64': isMobileOpen,
            '-translate-x-full w-64': !isMobileOpen,
          },
          isDark
            ? 'bg-gray-900/95 border-gray-700/50 backdrop-blur-xl'
            : 'bg-white/95 border-gray-200/50 backdrop-blur-xl',
          className
        )}
      >
        {/* Collapse Toggle (Desktop only) */}
        <button
          onClick={toggleCollapse}
          className={clsx(
            'hidden lg:flex p-0.5 rounded-lg transition-all duration-200 z-50',
            'focus:outline-none absolute -top-2 -right-4',
            'backdrop-blur-xl border shadow-lg hover:shadow-xl',
            isDark
              ? 'bg-gray-800/80 border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-700/80'
              : 'bg-white/80 border-gray-200/50 text-gray-600 hover:text-gray-900 hover:bg-white/90'
          )}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight sx={{ fontSize: 22 }} />
          ) : (
            <ChevronLeft sx={{ fontSize: 22 }} />
          )}
        </button>

        {/* Navigation */}
        <nav className='flex-1 p-2 space-y-1 overflow-y-auto scrollbar-thin pt-2'>
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

      {/* Spacer for main content */}
      <div
        className={clsx(
          'hidden lg:block transition-all duration-300',
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        )}
      />
    </>
  );
};

export default Sidebar;
