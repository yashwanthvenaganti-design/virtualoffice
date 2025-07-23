import React from 'react';
import clsx from 'clsx';
import { useTheme } from '../theme/ThemeContext';

interface SuccessIconProps {
  /**
   * Size variant of the success icon
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Color variant of the success icon
   * @default 'green'
   */
  variant?: 'green' | 'blue' | 'purple' | 'custom';
  /**
   * Custom CSS classes for the container
   */
  className?: string;
  /**
   * Custom CSS classes for the SVG icon
   */
  iconClassName?: string;
  /**
   * Custom background color (only used with variant='custom')
   */
  backgroundColor?: string;
  /**
   * Custom icon color (only used with variant='custom')
   */
  iconColor?: string;
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
}

const SuccessIcon: React.FC<SuccessIconProps> = ({
  size = 'md',
  variant = 'green',
  className,
  iconClassName,
  backgroundColor,
  iconColor,
  'aria-label': ariaLabel = 'Success',
  ...props
}) => {
  const { isDark } = useTheme();

  // Size configurations
  const sizeClasses = {
    sm: {
      container: 'w-10 h-10',
      icon: 'w-5 h-5',
    },
    md: {
      container: 'w-16 h-16',
      icon: 'w-8 h-8',
    },
    lg: {
      container: 'w-20 h-20',
      icon: 'w-10 h-10',
    },
    xl: {
      container: 'w-24 h-24',
      icon: 'w-12 h-12',
    },
  };

  // Color variant configurations
  const colorClasses = {
    green: {
      container: isDark ? 'bg-green-900/30 dark:bg-green-900/30' : 'bg-green-100',
      icon: isDark ? 'text-green-400' : 'text-green-600',
    },
    blue: {
      container: isDark ? 'bg-blue-900/30 dark:bg-blue-900/30' : 'bg-blue-100',
      icon: isDark ? 'text-blue-400' : 'text-blue-600',
    },
    purple: {
      container: isDark ? 'bg-purple-900/30 dark:bg-purple-900/30' : 'bg-purple-100',
      icon: isDark ? 'text-purple-400' : 'text-purple-600',
    },
    custom: {
      container: '',
      icon: '',
    },
  };

  const containerClasses = clsx(
    // Base classes
    'mx-auto mb-4 rounded-full flex items-center justify-center',
    // Size classes
    sizeClasses[size].container,
    // Color classes (if not custom)
    variant !== 'custom' && colorClasses[variant].container,
    // Custom className
    className
  );

  const iconClasses = clsx(
    // Size classes
    sizeClasses[size].icon,
    // Color classes (if not custom)
    variant !== 'custom' && colorClasses[variant].icon,
    // Custom icon className
    iconClassName
  );

  const containerStyle =
    variant === 'custom'
      ? {
          backgroundColor: backgroundColor,
        }
      : undefined;

  const iconStyle =
    variant === 'custom'
      ? {
          color: iconColor,
        }
      : undefined;

  return (
    <div
      className={containerClasses}
      style={containerStyle}
      role='img'
      aria-label={ariaLabel}
      {...props}
    >
      <svg
        className={iconClasses}
        style={iconStyle}
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
      </svg>
    </div>
  );
};

export default SuccessIcon;
