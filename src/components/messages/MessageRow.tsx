import React from 'react';
import { Box, Grid, Typography, Checkbox, IconButton, useTheme } from '@mui/material';
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
  const theme = useTheme();

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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: !message.isRead
          ? isDark
            ? 'rgba(30, 64, 175, 0.1)'
            : 'rgba(59, 130, 246, 0.1)'
          : 'transparent',
        transition: 'background-color 0.2s',
        '&:hover': {
          bgcolor: isDark ? 'grey.800' : 'grey.100',
        },
      }}
    >
      <Box
        sx={{
          width: 4,
          bgcolor: message.isRead ? 'transparent' : theme.palette.primary.main,
          flexShrink: 0,
        }}
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
              />
            </Box>
          </Grid>

          <Grid item xs={2}>
            <Typography
              fontWeight='medium'
              color={message.from === 'Alldaypa' ? 'error.main' : isDark ? 'grey.200' : 'grey.900'}
              fontSize='0.875rem'
            >
              {message.from}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography
              noWrap
              fontSize='0.875rem'
              fontWeight={message.isRead ? 'normal' : 'bold'}
              color={isDark ? 'grey.200' : 'grey.900'}
            >
              {message.subject}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography fontSize='0.875rem' color={isDark ? 'grey.300' : 'grey.600'}>
              {message.company}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography
              component='time'
              fontSize='0.875rem'
              color={isDark ? 'grey.400' : 'grey.500'}
              dateTime={message.date}
            >
              {formatDate(message.date)}
            </Typography>
          </Grid>

          <Grid item xs={1}>
            <IconButton
              size='small'
              onClick={handleMoreClick}
              sx={{
                opacity: 0,
                '&:hover': { bgcolor: isDark ? 'grey.700' : 'grey.300' },
                '.MuiBox:hover &': { opacity: 1 },
              }}
              aria-label={`More actions for message from ${message.from}`}
            >
              <MoreVertIcon fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      {isExpanded && <MessageContent message={message} isDark={isDark} />}
    </Box>
  );
};

export default MessageRow;
