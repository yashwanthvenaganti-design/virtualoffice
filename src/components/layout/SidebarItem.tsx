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

  const sidebarButton = (
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
    >
      <span className='flex-shrink-0 w-5 h-7'>{icon}</span>

      {!isCollapsed && (
        <span className='font-medium text-sm whitespace-nowrap overflow-hidden'>{label}</span>
      )}
    </button>
  );

  if (isCollapsed) {
    return (
      <CustomTooltip title={label} placement='right' transitionDuration={300}>
        {sidebarButton}
      </CustomTooltip>
    );
  }

  return sidebarButton;
};

export default SidebarItem;
