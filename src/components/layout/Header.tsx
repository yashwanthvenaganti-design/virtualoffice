import React, { useState } from 'react';
import { AppBar, Toolbar, Switch, FormControlLabel } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import Logo from '../common/Logo';
import SearchBar from '../common/SearchBar';
import UserMenu from '../common/UserMenu';
import Notifications from '../common/Notifications';
import { useTheme } from '../../theme/ThemeContext';

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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <AppBar
      position='sticky'
      elevation={0}
      className='glass border-b border-border'
      sx={{
        backgroundColor: 'transparent',
        color: 'inherit',
      }}
    >
      <Toolbar className='min-h-16 px-6'>
        <div className='flex items-center justify-between w-full'>
          {/* Left side - Logo and Search */}
          <div className='flex items-center gap-6 flex-1'>
            <Logo />
            <div className='hidden md:block flex-1 max-w-2xl'>
              <SearchBar
                value={searchQuery}
                onChange={handleSearchChange}
                onSearch={onSearch}
                placeholder='Search workspace...'
              />
            </div>
          </div>

          <div className='flex items-center gap-2'>
            {/* Mobile search trigger - you can add this later */}
            <div className='md:hidden'>{/* Mobile search icon */}</div>

            <div className='hidden sm:flex items-center'>
              <FormControlLabel
                control={
                  <Switch
                    checked={isDark}
                    onChange={toggleTheme}
                    size='small'
                    icon={
                      <div className='w-4 h-4 flex items-center justify-center'>
                        <LightMode sx={{ fontSize: 14, color: '#f59e0b' }} />
                      </div>
                    }
                    checkedIcon={
                      <div className='w-4 h-4 flex items-center justify-center'>
                        <DarkMode sx={{ fontSize: 14, color: '#6366f1' }} />
                      </div>
                    }
                    sx={{
                      width: 48,
                      height: 26,
                      padding: 0,
                      '& .MuiSwitch-switchBase': {
                        padding: 0,
                        margin: '2px',
                        transitionDuration: '300ms',
                        '&.Mui-checked': {
                          transform: 'translateX(22px)',
                          color: '#fff',
                          '& + .MuiSwitch-track': {
                            backgroundColor: isDark ? '#4338ca' : '#0ea5e9',
                            opacity: 1,
                            border: 0,
                          },
                        },
                      },
                      '& .MuiSwitch-thumb': {
                        boxSizing: 'border-box',
                        width: 22,
                        height: 22,
                        backgroundColor: '#ffffff',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      },
                      '& .MuiSwitch-track': {
                        borderRadius: 13,
                        backgroundColor: '#e2e8f0',
                        opacity: 1,
                        transition: 'background-color 300ms',
                      },
                    }}
                  />
                }
                label=''
                className='m-0'
              />
            </div>

            <Notifications count={notifications} onClick={onNotificationClick} />

            <UserMenu
              user={user}
              onLogout={onLogout}
              onUserSettings={onUserSettings}
              onProfileClick={onProfileClick}
            />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
