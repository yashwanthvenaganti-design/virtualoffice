import React from 'react';
import clsx from 'clsx';
import CustomTooltip from '../mui/CustomTooltip';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  path,
  isActive = false,
  isCollapsed = false,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const sidebarButton = (
    <button
      onClick={handleClick}
      className={clsx(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
        'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
        {
          'bg-sidebar-light-activeBg text-sidebar-light-active border border-primary-200/50':
            isActive && !document.documentElement.classList.contains('dark'),
          'dark:bg-sidebar-dark-activeBg dark:text-sidebar-dark-active dark:border dark:border-primary-500/30':
            isActive,
          // Inactive state
          'text-sidebar-light-textSecondary hover:bg-sidebar-light-hover hover:text-sidebar-light-text':
            !isActive,
          'dark:text-sidebar-dark-textSecondary dark:hover:bg-sidebar-dark-hover dark:hover:text-sidebar-dark-text':
            !isActive,
          'justify-center': isCollapsed,
          'justify-start': !isCollapsed,
        }
      )}
    >
      <div className='flex-shrink-0 w-5 h-5 flex items-center justify-center'>{icon}</div>

      {!isCollapsed && (
        <span className='font-medium text-sm whitespace-nowrap overflow-hidden flex-1 text-left'>
          {label}
        </span>
      )}

      {isActive && !isCollapsed && (
        <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full' />
      )}

      {isActive && isCollapsed && (
        <div className='absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary-500 rounded-full' />
      )}
    </button>
  );

  if (isCollapsed) {
    return (
      <CustomTooltip title={label} placement='right' transitionDuration={300} className='z-50'>
        {sidebarButton}
      </CustomTooltip>
    );
  }

  return sidebarButton;
};

export default SidebarItem;
