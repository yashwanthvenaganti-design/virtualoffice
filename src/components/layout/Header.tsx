import React, { useState } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { Search as SearchMobileIcon } from '@mui/icons-material';
import Logo from '../common/Logo';
import SearchBar from '../common/SearchBar';
import UserMenu from '../common/UserMenu';
import Notifications from '../common/Notifications';
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
        className={`
          backdrop-blur-xl border-b transition-all duration-200
          bg-header-light-bg/80 border-header-light-border shadow-header
          dark:bg-header-dark-bg/80 dark:border-header-dark-border dark:shadow-header-dark
        `}
      >
        <Toolbar className='min-h-16 xl:px-6 md:px-4 px-3'>
          <div className='flex items-center justify-between w-full gap-4'>
            {/* Left side - Logo and Search */}
            <div className='flex items-center gap-8 flex-1'>
              <Logo />

              {/* Desktop Search */}
              <div className='hidden lg:block flex-1 max-w-2xl'>
                <SearchBar
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onSearch={onSearch}
                  placeholder='Search workspace, files, or colleagues...'
                  showFilters={true}
                />
              </div>
            </div>

            {/* Right side - Actions */}
            <div className='flex items-center gap-1 md:gap-2 lg:gap-6 flex-shrink-0'>
              {/* Mobile Search Button */}
              <div className='lg:hidden'>
                <button
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className={`
                    p-2.5 rounded-xl transition-all duration-200 
                    focus:outline-none focus:ring-2 focus:ring-primary-500/20
                    text-header-light-textSecondary hover:text-header-light-text hover:bg-header-light-hover
                    dark:text-header-dark-textSecondary dark:hover:text-header-dark-text dark:hover:bg-header-dark-hover
                  `}
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
            className={`
            lg:hidden px-4 pb-4 border-t transition-all duration-200
            border-header-light-border bg-header-light-surface/50
            dark:border-header-dark-border dark:bg-header-dark-surface/50
          `}
          >
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              onSearch={onSearch}
              placeholder='Search workspace...'
              showFilters={false}
            />
          </div>
        )}
      </AppBar>
    </>
  );
};

export default Header;
