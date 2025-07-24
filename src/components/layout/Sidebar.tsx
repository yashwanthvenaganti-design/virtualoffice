import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  Home as HomeIcon,
  Schedule as AvailabilityIcon,
  Email as MessagesIcon,
  Devices as DevicesIcon,
  LocationOn as AddressesIcon,
  EmojiPeople as GreetingsIcon,
  Receipt as InvoicesIcon,
  Edit as ModifyIcon,
  Notifications as NotifyIcon,
  People as StaffIcon,
  BarChart as StatisticsIcon,
  HelpOutline as SupportIcon,
  Star as VIPsIcon,
  ExpandLess,
  ExpandMore,
  ChevronLeft as CollapseIcon,
  People,
  Schedule,
} from '@mui/icons-material';
import { useTheme } from '../../theme/ThemeContext';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  variant?: 'permanent' | 'persistent' | 'temporary';
  width?: number;
}

interface MenuItemProps {
  icon: React.ReactElement;
  label: string;
  path: string;
  badge?: number;
  children?: MenuItemProps[];
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  onToggle,
  variant = 'persistent',
  width = 260,
}) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const menuItems: MenuItemProps[] = [
    {
      icon: <HomeIcon />,
      label: 'Home',
      path: '/home',
    },
    {
      icon: <AvailabilityIcon />,
      label: 'Your availability',
      path: '/availability',
    },
    {
      icon: <MessagesIcon />,
      label: 'Your messages',
      path: '/messages',
      badge: 3,
    },
    {
      icon: <DevicesIcon />,
      label: 'Your app devices',
      path: '/devices',
    },
    {
      icon: <AddressesIcon />,
      label: 'Addresses',
      path: '/addresses',
    },
    {
      icon: <GreetingsIcon />,
      label: 'Greetings',
      path: '/greetings',
    },
    {
      icon: <InvoicesIcon />,
      label: 'Invoices',
      path: '/invoices',
    },
    {
      icon: <ModifyIcon />,
      label: 'Modify',
      path: '/modify',
    },
    {
      icon: <NotifyIcon />,
      label: 'Notify your PA',
      path: '/notify',
    },
    {
      icon: <StaffIcon />,
      label: 'Staff',
      path: '/staff',
      children: [
        { icon: <People />, label: 'Manage Staff', path: '/staff/manage' },
        { icon: <Schedule />, label: 'Staff Schedule', path: '/staff/schedule' },
      ],
    },
    {
      icon: <StatisticsIcon />,
      label: 'Statistics',
      path: '/statistics',
    },
    {
      icon: <SupportIcon />,
      label: 'Support',
      path: '/support',
    },
    {
      icon: <VIPsIcon />,
      label: 'VIPs',
      path: '/vips',
    },
  ];

  const handleItemClick = (item: MenuItemProps) => {
    if (item.children) {
      toggleExpanded(item.path);
    } else {
      navigate(item.path);
    }
  };

  const toggleExpanded = (path: string) => {
    setExpandedItems(prev =>
      prev.includes(path) ? prev.filter(item => item !== path) : [...prev, path]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isExpanded = (path: string) => {
    return expandedItems.includes(path);
  };

  const renderMenuItem = (item: MenuItemProps, depth = 0) => {
    const active = isActive(item.path);
    const hasChildren = item.children && item.children.length > 0;
    const expanded = isExpanded(item.path);

    return (
      <React.Fragment key={item.path}>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={() => handleItemClick(item)}
            sx={{
              minHeight: 48,
              mx: 1,
              mb: 0.5,
              borderRadius: '12px',
              pl: depth > 0 ? 4 : 2,
              pr: 2,
              backgroundColor: active
                ? isDark
                  ? 'rgba(59, 130, 246, 0.15)'
                  : 'rgba(59, 130, 246, 0.08)'
                : 'transparent',
              color: active ? (isDark ? '#60a5fa' : '#2563eb') : isDark ? '#e5e7eb' : '#374151',
              border: active
                ? `1px solid ${isDark ? 'rgba(96, 165, 250, 0.3)' : 'rgba(37, 99, 235, 0.2)'}`
                : '1px solid transparent',
              '&:hover': {
                backgroundColor: active
                  ? isDark
                    ? 'rgba(59, 130, 246, 0.2)'
                    : 'rgba(59, 130, 246, 0.12)'
                  : isDark
                    ? 'rgba(55, 65, 81, 0.8)'
                    : 'rgba(243, 244, 246, 0.8)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: 'inherit',
              }}
            >
              {React.cloneElement(item.icon, { sx: { fontSize: 20 } })}
            </ListItemIcon>

            <ListItemText
              primary={item.label}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '0.875rem',
                  fontWeight: active ? 600 : 500,
                  color: 'inherit',
                },
              }}
            />

            {/* Badge */}
            {item.badge && (
              <div
                className={`min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold flex items-center justify-center ${
                  isDark ? 'bg-red-500/90 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {item.badge}
              </div>
            )}

            {hasChildren && (expanded ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>

        {hasChildren && (
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {item.children!.map(child => renderMenuItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawerContent = (
    <div
      className={`h-full flex flex-col ${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <div
        className={`p-4 border-b flex items-center justify-between ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
            <span className='text-white font-bold text-sm'>V</span>
          </div>
          <div>
            <h2 className={`font-semibold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Virtual Office
            </h2>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Professional Suite
            </p>
          </div>
        </div>

        {variant === 'persistent' && (
          <IconButton
            onClick={onToggle}
            size='small'
            sx={{
              color: isDark ? '#9ca3af' : '#6b7280',
              '&:hover': {
                backgroundColor: isDark ? 'rgba(55, 65, 81, 0.8)' : 'rgba(243, 244, 246, 0.8)',
              },
            }}
          >
            <CollapseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </div>

      <div className='flex-1 overflow-y-auto py-4'>
        <List sx={{ px: 1 }}>{menuItems.map(item => renderMenuItem(item))}</List>
      </div>

      <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Virtual Office v2.0
        </div>
      </div>
    </div>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onToggle}
      sx={{
        width: open ? width : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          borderRight: 'none',
          boxShadow: isDark ? '4px 0 24px rgba(0, 0, 0, 0.4)' : '4px 0 24px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
