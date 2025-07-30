import React, { useState } from 'react';
import { AppBar, Toolbar, Switch, FormControlLabel } from '@mui/material';
import { LightMode, DarkMode, Search as SearchMobileIcon } from '@mui/icons-material';
import Logo from '../common/Logo';
import SearchBar from '../common/SearchBar';
import UserMenu from '../common/UserMenu';
import Notifications from '../common/Notifications';
import { useTheme } from '../../theme/ThemeContext';
import ThemeToggle from '../../pages/ThemeToggle';

interface User {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface HeaderProps {
  user?: User;
  onSearch?: (query: string) => void;
  onLogout?: () => void;
  onUserSettings?: () => void;
  onProfileClick?: () => void;
  onNotificationClick?: () => void;
  notifications?: number;
}

const Header: React.FC<HeaderProps> = ({
  user = {
    name: 'John Smith',
    email: 'john.smith@virtualoffice.co.uk',
    role: 'admin',
  },
  onSearch,
  onLogout,
  onUserSettings,
  onProfileClick,
  onNotificationClick,
  notifications = 0,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <>
      <AppBar
        position='sticky'
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          color: 'inherit',
          borderBottom: '1px solid',
          borderColor: 'rgb(var(--color-border))',
          borderRadius: '0 0 5px 5px',
        }}
        className={`backdrop-blur-xl ${
          isDark ? 'bg-gray-900/80 shadow-xl' : 'bg-white/80 shadow-sm'
        }`}
      >
        <Toolbar className='min-h-16 xl:px-3 md:px-2 px-1'>
          <div className='flex items-center justify-between w-full gap-2'>
            {/* Left side - Logo and Search */}
            <div className='flex items-center gap-6 flex-1'>
              <Logo />

              {/* Desktop Search */}
              <div className='hidden lg:block flex-1 max-w-2xl'>
                <SearchBar
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onSearch={onSearch}
                  placeholder='Search workspace, files, or colleagues...'
                />
              </div>
            </div>

            {/* Right side - Actions */}
            <div className='flex items-center gap-1'>
              {/* Mobile Search Button */}
              <div className='lg:hidden'>
                <button
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    isDark
                      ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                      : 'hover:bg-gray-100/80 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <SearchMobileIcon sx={{ fontSize: 20 }} />
                </button>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Notifications */}
              <Notifications count={notifications} onClick={onNotificationClick} />

              {/* User Menu */}
              <UserMenu
                user={user}
                onLogout={onLogout}
                onUserSettings={onUserSettings}
                onProfileClick={onProfileClick}
              />
            </div>
          </div>
        </Toolbar>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div
            className={`lg:hidden px-6 p-2 border-t ${
              isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'
            }`}
          >
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              onSearch={onSearch}
              placeholder='Search workspace...'
            />
          </div>
        )}
      </AppBar>
    </>
  );
};

export default Header;
