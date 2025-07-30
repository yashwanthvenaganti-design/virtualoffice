import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MessageContent from './MessageContent';

interface Message {
  id: number;
  from: string;
  subject: string;
  company: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  isRead: boolean;
  hasAttachment: boolean;
  content: string;
}

interface MessageRowProps {
  message: Message;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: (messageId: number) => void;
  onExpand: (messageId: number | null) => void;
  isDark: boolean;
}

const MessageRow: React.FC<MessageRowProps> = ({
  message,
  isSelected,
  isExpanded,
  onSelect,
  onExpand,
  isDark,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }) +
      ' ' +
      date.toLocaleTimeString('en-GB', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    );
  };

  const handleRowClick = () => {
    onExpand(isExpanded ? null : message.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleRowClick();
    }
  };

  const handleCheckboxChange = (event: React.MouseEvent) => {
    event.stopPropagation();
    onSelect(message.id);
  };

  const handleMoreClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    // Handle more actions
  };

  return (
    <article
      className={`transition-all duration-200 ${
        !message.isRead ? 'bg-blue-50/30 dark:bg-blue-900/10 border-l-4 border-blue-500' : ''
      }`}
      role='row'
      aria-expanded={isExpanded}
      aria-selected={isSelected}
    >
      {/* Main Row */}
      <div
        className={`px-6 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 group`}
        onClick={handleRowClick}
        onKeyDown={handleKeyDown}
        role='button'
        tabIndex={0}
        aria-label={`Message from ${message.from}: ${message.subject}. ${isExpanded ? 'Collapse' : 'Expand'} to ${isExpanded ? 'hide' : 'view'} content`}
      >
        <div className='grid grid-cols-12 gap-4 items-center'>
          {/* Checkbox */}
          <div className='col-span-1'>
            <input
              type='checkbox'
              checked={isSelected}
              onChange={() => {}}
              onClick={handleCheckboxChange}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              aria-label={`Select message from ${message.from}`}
            />
          </div>

          {/* From */}
          <div className='col-span-2'>
            <span
              className={`text-sm font-medium ${
                message.from === 'Alldaypa'
                  ? 'text-red-600 dark:text-red-400'
                  : isDark
                    ? 'text-gray-200'
                    : 'text-gray-900'
              }`}
            >
              {message.from}
            </span>
          </div>

          {/* Subject */}
          <div className='col-span-4'>
            <div className='flex items-center gap-2'>
              {/* {message.hasAttachment && <AttachmentIndicator />} */}
              <span
                className={`text-sm truncate ${
                  !message.isRead ? 'font-semibold' : 'font-normal'
                } ${isDark ? 'text-gray-200' : 'text-gray-900'}`}
              >
                {message.subject}
              </span>
            </div>
          </div>

          {/* Company */}
          <div className='col-span-2'>
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {message.company}
            </span>
          </div>

          {/* Date */}
          <div className='col-span-2'>
            <time
              className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              dateTime={message.date}
            >
              {formatDate(message.date)}
            </time>
          </div>

          {/* Actions */}
          <div className='col-span-1 flex justify-end'>
            <button
              className={`p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
              onClick={handleMoreClick}
              aria-label={`More actions for message from ${message.from}`}
            >
              <MoreVertIcon className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && <MessageContent message={message} isDark={isDark} />}
    </article>
  );
};

export default MessageRow;
