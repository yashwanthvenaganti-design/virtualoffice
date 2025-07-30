import React, { useState, useRef, useEffect } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import ForwardIcon from '@mui/icons-material/Forward';

interface ActionsDropdownProps {
  isDark: boolean;
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({ isDark }) => {
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowActionsMenu(false);
      }
    };

    if (showActionsMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showActionsMenu]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setShowActionsMenu(false);
    }
  };

  const actionItems = [
    { icon: VisibilityIcon, label: 'Mark as read', action: () => console.log('Mark as read') },
    {
      icon: VisibilityOffIcon,
      label: 'Mark as unread',
      action: () => console.log('Mark as unread'),
    },
    { icon: ForwardIcon, label: 'Forward', action: () => console.log('Forward') },
    { icon: ArchiveIcon, label: 'Archive', action: () => console.log('Archive') },
  ];

  const dangerousActions = [
    { icon: DeleteIcon, label: 'Delete', action: () => console.log('Delete') },
  ];

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setShowActionsMenu(!showActionsMenu)}
        onKeyDown={handleKeyDown}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 hover:shadow-md ${
          isDark
            ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
        aria-expanded={showActionsMenu}
        aria-haspopup='menu'
        aria-label='Message actions menu'
        id='actions-button'
      >
        <SettingsIcon className='w-4 h-4' aria-hidden='true' />
        <span>Actions</span>
        <ExpandMoreIcon
          className={`w-4 h-4 transition-transform duration-200 ${showActionsMenu ? 'rotate-180' : ''}`}
          aria-hidden='true'
        />
      </button>

      {showActionsMenu && (
        <div
          className={`absolute right-0 top-full mt-2 w-56 rounded-xl shadow-xl border z-50 ${
            isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
          } backdrop-blur-sm`}
          role='menu'
          aria-labelledby='actions-button'
          onKeyDown={handleKeyDown}
        >
          <div className='p-2'>
            {actionItems.map(({ icon: Icon, label, action }) => (
              <button
                key={label}
                onClick={() => {
                  action();
                  setShowActionsMenu(false);
                }}
                className='w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors'
                role='menuitem'
              >
                <Icon className='w-4 h-4' aria-hidden='true' />
                {label}
              </button>
            ))}

            <hr className='border-t border-gray-200 dark:border-gray-600 my-2' role='separator' />

            {dangerousActions.map(({ icon: Icon, label, action }) => (
              <button
                key={label}
                onClick={() => {
                  action();
                  setShowActionsMenu(false);
                }}
                className='w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-3 transition-colors'
                role='menuitem'
              >
                <Icon className='w-4 h-4' aria-hidden='true' />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionsDropdown;
