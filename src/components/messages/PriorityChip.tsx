import React from 'react';

interface PriorityChipProps {
  priority: 'high' | 'medium' | 'low';
  isDark?: boolean;
}

const PriorityChip: React.FC<PriorityChipProps> = ({ priority, isDark = false }) => {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
          label: 'High priority',
          icon: '🔴',
        };
      case 'medium':
        return {
          className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
          label: 'Medium priority',
          icon: '🟡',
        };
      case 'low':
        return {
          className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
          label: 'Low priority',
          icon: '🟢',
        };
      default:
        return {
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
          label: 'No priority',
          icon: '⚪',
        };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.className}`}
      role='status'
      aria-label={config.label}
      title={config.label}
    >
      <span aria-hidden='true'>{config.icon}</span>
      <span className='capitalize'>{priority}</span>
    </span>
  );
};

export default PriorityChip;
