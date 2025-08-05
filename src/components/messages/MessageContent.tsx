import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
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
  onCloseDropdown?: () => void;
}

const MessageContent: React.FC<MessageContentProps> = ({ message, onCloseDropdown }) => {
  const handleActionClick = () => {
    onCloseDropdown?.();
  };

  return (
    <Box
      component='section'
      aria-label={`Content of message from ${message.from}`}
      className='border-l-4 border-red-500 bg-gray-50 dark:bg-gray-800 px-3 pb-3 pt-2'
    >
      <Box ml={6}>
        <MessageActions
          messageId={message.id}
          messageFrom={message.from}
          messageCompany={message.company}
          onActionClick={handleActionClick}
        />

        <Paper
          elevation={1}
          className='mt-2 p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-sm'
        >
          <Typography
            component='pre'
            variant='body2'
            className='font-mono whitespace-pre-wrap text-gray-900 dark:text-gray-300 m-0 text-[14px]'
            role='document'
            aria-label='Message content'
          >
            {message.content}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default MessageContent;
