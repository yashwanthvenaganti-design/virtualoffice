import React from 'react';
import MessageActions from './MessageActions';

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

interface MessageContentProps {
  message: Message;
  isDark: boolean;
}

const MessageContent: React.FC<MessageContentProps> = ({ message, isDark }) => {
  return (
    <section
      className={`px-6 pb-6 border-l-4 border-red-500 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}
      aria-label={`Content of message from ${message?.from}`}
    >
      <div className='ml-8'>
        <MessageActions isDark={isDark} messageId={message?.id} />

        <div
          className={`p-6 rounded-lg border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } shadow-sm`}
        >
          <pre
            className={`text-sm whitespace-pre-wrap font-mono leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
            role='document'
            aria-label='Message content'
          >
            {message?.content}
          </pre>
        </div>
      </div>
    </section>
  );
};

export default MessageContent;
