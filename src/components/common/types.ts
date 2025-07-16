export interface User {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface HeaderProps {
  user?: User;
  onSearch?: (query: string) => void;
  onLogout?: () => void;
  onUserSettings?: () => void;
  onNotificationClick?: () => void;
  notifications?: number;
}

export interface LogoProps {
  companyName?: string;
  showIcon?: boolean;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  maxWidth?: number;
}

export interface NotificationsProps {
  count: number;
  onClick?: () => void;
  maxCount?: number;
}

export interface UserMenuProps {
  user: User;
  onLogout?: () => void;
  onUserSettings?: () => void;
  onProfileClick?: () => void;
}

export type UserRole = 'admin' | 'user' | 'guest';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  divider?: boolean;
}
