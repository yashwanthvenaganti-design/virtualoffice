import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
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
  const theme = useTheme();

  return (
    <Box
      component='section'
      aria-label={`Content of message from ${message.from}`}
      sx={{
        borderLeft: `4px solid ${theme.palette.error.main}`,
        backgroundColor: isDark ? theme.palette.background.paper : theme.palette.grey[50],
        px: 3,
        pb: 3,
        pt: 2,
      }}
    >
      <Box ml={6}>
        <MessageActions
          isDark={isDark}
          messageId={message.id}
          messageFrom={message.from}
          messageCompany={message.company}
        />

        <Paper
          elevation={1}
          sx={{
            mt: 2,
            p: 3,
            borderRadius: 2,
            backgroundColor: isDark ? theme.palette.background.default : '#fff',
            border: `1px solid ${isDark ? theme.palette.grey[700] : theme.palette.grey[300]}`,
            boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.5)' : '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <Typography
            component='pre'
            variant='body2'
            sx={{
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              color: isDark ? theme.palette.grey[300] : theme.palette.text.primary,
              m: 0,
            }}
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
