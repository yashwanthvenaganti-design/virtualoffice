import React from 'react';
import MessageRow from './MessageRow';
import MessageTableHeader from './MessageTableHeader';

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

interface MessageTableProps {
  messages: Message[];
  selectedMessages: number[];
  expandedMessage: number | null;
  selectAll: boolean;
  onSelectMessage: (messageId: number) => void;
  onSelectAll: (checked: boolean) => void;
  onExpandMessage: (messageId: number | null) => void;
  isDark: boolean;
}

const MessageTable: React.FC<MessageTableProps> = ({
  messages,
  selectedMessages,
  expandedMessage,
  selectAll,
  onSelectMessage,
  onSelectAll,
  onExpandMessage,
  isDark,
}) => {
  return (
    <div
      className={`rounded-xl border overflow-hidden shadow-sm ${
        isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}
      role='table'
      aria-label='Messages table'
    >
      <MessageTableHeader selectAll={selectAll} onSelectAll={onSelectAll} isDark={isDark} />

      <div className='divide-y divide-gray-200 dark:divide-gray-700' role='rowgroup'>
        {messages.map(message => (
          <MessageRow
            key={message.id}
            message={message}
            isSelected={selectedMessages.includes(message.id)}
            isExpanded={expandedMessage === message.id}
            onSelect={onSelectMessage}
            onExpand={onExpandMessage}
            isDark={isDark}
          />
        ))}
      </div>

      {messages.length === 0 && (
        <div className={`p-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>No messages found</p>
        </div>
      )}
    </div>
  );
};

export default MessageTable;
