import React from 'react';
import { Box, Grid, Typography, Checkbox, IconButton } from '@mui/material';
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
}

const MessageRow: React.FC<MessageRowProps> = ({
  message,
  isSelected,
  isExpanded,
  onSelect,
  onExpand,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString('en-GB', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  const handleRowClick = () => onExpand(isExpanded ? null : message.id);
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(message.id);
  };
  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Box
      component='article'
      role='row'
      aria-expanded={isExpanded}
      aria-selected={isSelected}
      onClick={handleRowClick}
      className={`group flex flex-col transition-colors duration-200 
        ${!message.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-transparent'}
        hover:bg-gray-100 dark:hover:bg-gray-800`}
    >
      {/* Unread indicator */}
      <Box
        className='w-1 bg-transparent'
        sx={{ bgcolor: message.isRead ? 'transparent' : 'primary.main' }}
      />

      {/* Content */}
      <Box px={1} py={1} flex={1}>
        <Grid container alignItems='center' spacing={2}>
          <Grid item xs={1}>
            <Box display='flex' alignItems='center' justifyContent='center'>
              <Checkbox
                checked={isSelected}
                onClick={handleCheckboxClick}
                inputProps={{ 'aria-label': `Select message from ${message.from}` }}
                size='small'
                className='opacity-0 group-hover:opacity-100 transition-opacity duration-200'
              />
            </Box>
          </Grid>

          <Grid item xs={2}>
            <Typography
              fontWeight='medium'
              className={`${message.from === 'Alldaypa' ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-200'} text-sm`}
            >
              {message.from}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography
              noWrap
              className={`text-sm ${message.isRead ? 'font-normal' : 'font-bold'} text-gray-900 dark:text-gray-200`}
            >
              {message.subject}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography className='text-sm text-gray-600 dark:text-gray-300'>
              {message.company}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography
              component='time'
              className='text-sm text-gray-500 dark:text-gray-400'
              dateTime={message.date}
            >
              {formatDate(message.date)}
            </Typography>
          </Grid>

          <Grid item xs={1}>
            <IconButton
              size='small'
              onClick={handleMoreClick}
              className='opacity-0 hover:bg-gray-300 dark:hover:bg-gray-700 group-hover:opacity-100'
              aria-label={`More actions for message from ${message.from}`}
            >
              <MoreVertIcon fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      {isExpanded && <MessageContent message={message} />}
    </Box>
  );
};

export default MessageRow;
