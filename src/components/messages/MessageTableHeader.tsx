import React from 'react';

interface MessageTableHeaderProps {
  selectAll: boolean;
  onSelectAll: (checked: boolean) => void;
  isDark: boolean;
}

const MessageTableHeader: React.FC<MessageTableHeaderProps> = ({
  selectAll,
  onSelectAll,
  isDark,
}) => {
  const headers = [
    { key: 'select', label: '', colSpan: 1 },
    { key: 'from', label: 'From', colSpan: 2 },
    { key: 'subject', label: 'Subject', colSpan: 4 },
    { key: 'company', label: 'Company', colSpan: 2 },
    { key: 'date', label: 'Date', colSpan: 2 },
    { key: 'actions', label: '', colSpan: 1 },
  ];

  return (
    <header
      className={`px-6 py-4 border-b ${
        isDark ? 'bg-gray-800/80 border-gray-700' : 'bg-gray-50/80 border-gray-200'
      }`}
      role='rowheader'
    >
      <div className='grid grid-cols-12 gap-4 items-center'>
        {headers.map(({ key, label, colSpan }) => (
          <div key={key} className={`col-span-${colSpan}`}>
            {key === 'select' ? (
              <input
                type='checkbox'
                checked={selectAll}
                onChange={e => onSelectAll(e.target.checked)}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                aria-label='Select all messages'
              />
            ) : label ? (
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}
                role='columnheader'
                aria-sort='none'
              >
                {label}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </header>
  );
};

export default MessageTableHeader;
