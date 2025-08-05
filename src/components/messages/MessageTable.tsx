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
}

const MessageTable: React.FC<MessageTableProps> = ({
  messages,
  selectedMessages,
  expandedMessage,
  selectAll,
  onSelectMessage,
  onSelectAll,
  onExpandMessage,
}) => {
  return (
    <div
      className='rounded-xl border overflow-hidden shadow-sm border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
      role='table'
      aria-label='Messages table'
    >
      {/* Header */}
      <MessageTableHeader selectAll={selectAll} onSelectAll={onSelectAll} />

      {/* Table Rows */}
      <div className='divide-y divide-gray-200 dark:divide-gray-700' role='rowgroup'>
        {messages.map(message => (
          <MessageRow
            key={message.id}
            message={message}
            isSelected={selectedMessages.includes(message.id)}
            isExpanded={expandedMessage === message.id}
            onSelect={onSelectMessage}
            onExpand={onExpandMessage}
          />
        ))}
      </div>

      {/* Empty State */}
      {messages.length === 0 && (
        <div className='p-8 text-center text-gray-500 dark:text-gray-400'>
          <p>No messages found</p>
        </div>
      )}
    </div>
  );
};

export default MessageTable;
