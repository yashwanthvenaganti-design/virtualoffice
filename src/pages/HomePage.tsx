import React, { useState, createContext, useContext } from 'react';
import {
  Menu,
  MenuItem,
  Button,
  Checkbox,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Box,
} from '@mui/material';
import {
  Search,
  ExpandMore,
  Settings,
  Mail,
  MoreVert,
  Forward,
  Delete,
  Visibility,
  VisibilityOff,
  Fullscreen,
  FullscreenExit,
  Edit,
  Add,
  Close,
} from '@mui/icons-material';
import { useTheme } from '../theme/ThemeContext';
import CustomTooltip from '../components/mui/CustomTooltip';

const HomePage = () => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Everything (inc. msg)');
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  // Menu states
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [actionsMenuAnchor, setActionsMenuAnchor] = useState<null | HTMLElement>(null);
  const [messageMenuAnchor, setMessageMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedMessageId, setSelectedMessageId] = useState<null | number>(null);

  // Sample data with more messages
  const messages = [
    {
      id: 1,
      from: 'Alldaypa',
      subject: 'alldayPA: New Account Details',
      company: '',
      date: '2025-07-09 20:43:03',
      content: `!! AWAITING REVISED COPY !!

Dear John,

Welcome to alldayPA, and congratulations on registering your new account.

You can download the welcome pack at https://www.alldaypa.co.uk/alldayPA-Welcome.pdf

We are proud to inform you that you have joined the call answering market leader since 1999, and we pride ourselves on offering the best front line support for businesses - regardless of your business size.

In order for you to get started we have included our Welcome Pack which will explain how to get the most out of our service. Please see attached document.

For your reference, here is your alldayPA account information:

Virtual office name: adpcx_dev
Virtual office url: https://virtualoffice.alldaypa.com/login?company=adpcx_dev

The attached document will explain in full what to do with your account information.

Kind regards,

Gareth Jeffery
Head of Customer Service`,
    },
    {
      id: 2,
      from: 'Support Team',
      subject: 'Your support ticket has been resolved',
      company: 'TechCorp',
      date: '2025-07-08 14:22:15',
      content: 'Your support request has been successfully resolved. Thank you for your patience.',
    },
    {
      id: 3,
      from: 'Billing Department',
      subject: 'Monthly Invoice Available',
      company: 'ServicePro',
      date: '2025-07-07 09:15:30',
      content: 'Your monthly invoice is now available for download from your account dashboard.',
    },
  ];

  const filterOptions = [
    { value: 'Everything (inc. msg)', placeholder: 'Search by everything...' },
    { value: 'Company name', placeholder: 'Search by company name...' },
    { value: 'From', placeholder: 'Search by sender...' },
    { value: 'Subject', placeholder: 'Search by subject...' },
  ];

  const actionItems = [
    {
      icon: <FullscreenExit sx={{ fontSize: 16 }} />,
      label: 'Collapse',
      action: () => {
        setExpandedMessage(null);
        setActionsMenuAnchor(null);
      },
    },
    {
      icon: <Forward sx={{ fontSize: 16 }} />,
      label: 'Forward',
      action: () => {
        console.log('Forward selected messages:', selectedMessages);
        setActionsMenuAnchor(null);
      },
    },
    {
      icon: <Delete sx={{ fontSize: 16 }} />,
      label: 'Delete',
      action: () => {
        console.log('Delete selected messages:', selectedMessages);
        setActionsMenuAnchor(null);
      },
      danger: true,
    },
    {
      icon: <Fullscreen sx={{ fontSize: 16 }} />,
      label: 'Expand',
      action: () => {
        if (selectedMessages.length > 0) {
          setExpandedMessage(selectedMessages[0]);
        }
        setActionsMenuAnchor(null);
      },
    },
    {
      icon: <Visibility sx={{ fontSize: 16 }} />,
      label: 'Mark as read',
      action: () => {
        console.log('Mark as read:', selectedMessages);
        setActionsMenuAnchor(null);
      },
    },
    {
      icon: <VisibilityOff sx={{ fontSize: 16 }} />,
      label: 'Mark as unread',
      action: () => {
        console.log('Mark as unread:', selectedMessages);
        setActionsMenuAnchor(null);
      },
    },
  ];

  // Get current placeholder based on selected filter
  const getCurrentPlaceholder = () => {
    const filterOption = filterOptions.find(option => option.value === selectedFilter);
    return filterOption ? filterOption.placeholder : 'Search...';
  };

  const handleSelectMessage = messageId => {
    setSelectedMessages(prev => {
      const newSelection = prev.includes(messageId)
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId];

      // Update select all state
      setSelectAll(newSelection.length === messages.length);
      return newSelection;
    });
  };

  const handleSelectAll = checked => {
    setSelectAll(checked);
    if (checked) {
      setSelectedMessages(messages.map(msg => msg.id));
    } else {
      setSelectedMessages([]);
    }
  };

  const handleMessageMenuClick = (event, messageId) => {
    setMessageMenuAnchor(event.currentTarget);
    setSelectedMessageId(messageId);
  };

  const handleMessageMenuAction = (action, messageId) => {
    if (messageId) {
      // Individual message action
      if (action.label === 'Expand') {
        setExpandedMessage(messageId);
      } else if (action.label === 'Collapse') {
        setExpandedMessage(null);
      } else {
        console.log(`${action.label} message:`, messageId);
      }
    }
    setMessageMenuAnchor(null);
    setSelectedMessageId(null);
  };

  return (
    <Box
      sx={{
        minHeight: '100%',
        backgroundColor: isDark ? '#111827' : '#f9fafb',
        color: isDark ? 'white' : '#111827',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
          backdropFilter: 'blur(20px)',
          backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.5)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <Box sx={{ px: 3, py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Mail sx={{ fontSize: 20, color: '#6b7280' }} />
            <Box component='h1' sx={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
              Your messages
            </Box>
          </Box>

          {/* Search and Filter Bar */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              alignItems: { xs: 'stretch', sm: 'center' },
            }}
          >
            {/* Filter Dropdown */}
            <Button
              variant='outlined'
              onClick={event => setFilterMenuAnchor(event.currentTarget)}
              endIcon={<ExpandMore />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
                minWidth: '200px',
                backgroundColor: isDark ? '#374151' : '#f3f4f6',
                borderColor: isDark ? '#4b5563' : '#d1d5db',
                color: isDark ? 'white' : '#374151',
                '&:hover': {
                  backgroundColor: isDark ? '#4b5563' : 'white',
                  borderColor: isDark ? '#6b7280' : '#9ca3af',
                },
              }}
            >
              {selectedFilter}
            </Button>

            <Menu
              anchorEl={filterMenuAnchor}
              open={Boolean(filterMenuAnchor)}
              onClose={() => setFilterMenuAnchor(null)}
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  backdropFilter: 'blur(20px)',
                  backgroundColor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                  border: `1px solid ${isDark ? '#4b5563' : '#e5e7eb'}`,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  minWidth: '200px',
                },
              }}
            >
              {filterOptions.map(option => (
                <MenuItem
                  key={option.value}
                  onClick={() => {
                    setSelectedFilter(option.value);
                    setFilterMenuAnchor(null);
                    setSearchQuery(''); // Clear search when changing filter
                  }}
                  selected={selectedFilter === option.value}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    my: 0.5,
                    color: isDark ? 'white' : '#374151',
                    '&.Mui-selected': {
                      backgroundColor: isDark
                        ? 'rgba(59, 130, 246, 0.2)'
                        : 'rgba(219, 234, 254, 1)',
                      color: isDark ? '#60a5fa' : '#2563eb',
                    },
                  }}
                >
                  {option.value}
                </MenuItem>
              ))}
            </Menu>

            {/* Search Input */}
            <TextField
              variant='outlined'
              placeholder={getCurrentPlaceholder()}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              size='small'
              sx={{
                flexGrow: 1,
                maxWidth: '400px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: isDark ? '#374151' : 'white',
                  '& fieldset': {
                    borderColor: isDark ? '#4b5563' : '#d1d5db',
                  },
                  '&:hover fieldset': {
                    borderColor: isDark ? '#60a5fa' : '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: isDark ? '#60a5fa' : '#3b82f6',
                    boxShadow: `0 0 0 3px ${isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)'}`,
                  },
                },
                '& .MuiInputBase-input': {
                  color: isDark ? 'white' : '#111827',
                  '&::placeholder': {
                    color: isDark ? '#9ca3af' : '#6b7280',
                    opacity: 1,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Search sx={{ fontSize: 16, color: isDark ? '#9ca3af' : '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Actions Button */}
            <CustomTooltip title='Actions'>
              <Button
                variant='outlined'
                onClick={event => setActionsMenuAnchor(event.currentTarget)}
                startIcon={<Settings sx={{ fontSize: 16 }} />}
                endIcon={<ExpandMore />}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  backgroundColor: isDark ? '#374151' : 'white',
                  borderColor: isDark ? '#4b5563' : '#d1d5db',
                  color: isDark ? 'white' : '#374151',
                  '&:hover': {
                    backgroundColor: isDark ? '#4b5563' : '#f9fafb',
                    borderColor: isDark ? '#6b7280' : '#9ca3af',
                  },
                }}
              >
                Actions
              </Button>
            </CustomTooltip>

            <Menu
              anchorEl={actionsMenuAnchor}
              open={Boolean(actionsMenuAnchor)}
              onClose={() => setActionsMenuAnchor(null)}
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  backdropFilter: 'blur(20px)',
                  backgroundColor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                  border: `1px solid ${isDark ? '#4b5563' : '#e5e7eb'}`,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  minWidth: '180px',
                },
              }}
            >
              {actionItems.map((item, index) => (
                <MenuItem
                  key={item.label}
                  onClick={item.action}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    my: 0.5,
                    color: item.danger ? '#ef4444' : isDark ? 'white' : '#374151',
                    '&:hover': {
                      backgroundColor: item.danger
                        ? isDark
                          ? 'rgba(127, 29, 29, 0.2)'
                          : 'rgba(254, 242, 242, 1)'
                        : isDark
                          ? '#374151'
                          : '#f3f4f6',
                    },
                  }}
                >
                  <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>{item.icon}</Box>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Box>

      {/* Messages Table */}
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            borderRadius: 3,
            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
            overflow: 'hidden',
            backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : 'white',
          }}
        >
          {/* Table Header */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 2fr 1fr 1fr 60px',
              gap: 2,
              px: 3,
              py: 2,
              borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
              backgroundColor: isDark ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.5)',
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
          >
            <Box>
              <Checkbox
                size='small'
                checked={selectAll}
                indeterminate={
                  selectedMessages.length > 0 && selectedMessages.length < messages.length
                }
                onChange={e => handleSelectAll(e.target.checked)}
                sx={{
                  color: isDark ? '#9ca3af' : '#6b7280',
                  '&.Mui-checked': {
                    color: isDark ? '#3b82f6' : '#2563eb',
                  },
                  '&.MuiCheckbox-indeterminate': {
                    color: isDark ? '#3b82f6' : '#2563eb',
                  },
                }}
              />
            </Box>
            <Box>From</Box>
            <Box>Subject</Box>
            <Box>Company</Box>
            <Box>Date</Box>
            <Box></Box>
          </Box>

          {/* Message Rows */}
          {messages.map(message => (
            <React.Fragment key={message.id}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 2fr 1fr 1fr 60px',
                  gap: 2,
                  px: 3,
                  py: 2,
                  borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor: isDark ? 'rgba(55, 65, 81, 0.3)' : 'rgba(249, 250, 251, 1)',
                  },
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Checkbox
                    size='small'
                    checked={selectedMessages.includes(message.id)}
                    onChange={() => handleSelectMessage(message.id)}
                    sx={{
                      color: isDark ? '#9ca3af' : '#6b7280',
                      '&.Mui-checked': {
                        color: isDark ? '#3b82f6' : '#2563eb',
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Box component='span' sx={{ color: '#ef4444', fontWeight: 500 }}>
                    {message.from}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Edit sx={{ fontSize: 14, color: '#9ca3af' }} />
                  <Box
                    component='span'
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {message.subject}
                  </Box>
                </Box>
                <Box>{message.company}</Box>
                <Box sx={{ fontSize: '0.875rem' }}>{message.date}</Box>
                <Box>
                  <CustomTooltip title='Message actions'>
                    <IconButton
                      size='small'
                      onClick={event => handleMessageMenuClick(event, message.id)}
                      sx={{
                        color: isDark ? '#9ca3af' : '#6b7280',
                        '&:hover': {
                          backgroundColor: isDark
                            ? 'rgba(55, 65, 81, 0.5)'
                            : 'rgba(243, 244, 246, 1)',
                        },
                      }}
                    >
                      <MoreVert sx={{ fontSize: 16 }} />
                    </IconButton>
                  </CustomTooltip>
                </Box>
              </Box>

              {/* Expanded Message Content */}
              {expandedMessage === message.id && (
                <Box
                  sx={{
                    gridColumn: '1 / -1',
                    borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    backgroundColor: isDark ? 'rgba(31, 41, 55, 0.2)' : 'rgba(249, 250, 251, 0.5)',
                  }}
                >
                  <Box sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                          variant='contained'
                          startIcon={<Add sx={{ fontSize: 14 }} />}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 500,
                            backgroundColor: isDark ? '#3b82f6' : '#2563eb',
                            '&:hover': {
                              backgroundColor: isDark ? '#2563eb' : '#1d4ed8',
                            },
                          }}
                        >
                          Create new VIP
                        </Button>
                        <Button
                          variant='contained'
                          startIcon={<Delete sx={{ fontSize: 14 }} />}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 500,
                            backgroundColor: '#ef4444',
                            '&:hover': {
                              backgroundColor: '#dc2626',
                            },
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                      <IconButton
                        onClick={() => setExpandedMessage(null)}
                        sx={{
                          color: isDark ? '#9ca3af' : '#6b7280',
                          '&:hover': {
                            backgroundColor: isDark
                              ? 'rgba(55, 65, 81, 0.5)'
                              : 'rgba(243, 244, 246, 1)',
                          },
                        }}
                      >
                        <Close sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>

                    <Box
                      sx={{
                        borderLeft: '4px solid #ef4444',
                        pl: 3,
                        color: isDark ? '#d1d5db' : '#374151',
                      }}
                    >
                      <Box
                        sx={{
                          whiteSpace: 'pre-wrap',
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                        }}
                      >
                        {message.content}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>

      {/* Message Actions Menu */}
      <Menu
        anchorEl={messageMenuAnchor}
        open={Boolean(messageMenuAnchor)}
        onClose={() => setMessageMenuAnchor(null)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            backdropFilter: 'blur(20px)',
            backgroundColor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            border: `1px solid ${isDark ? '#4b5563' : '#e5e7eb'}`,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            minWidth: '180px',
          },
        }}
      >
        {actionItems.map(item => (
          <MenuItem
            key={item.label}
            onClick={() => handleMessageMenuAction(item, selectedMessageId)}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              color: item.danger ? '#ef4444' : isDark ? 'white' : '#374151',
              '&:hover': {
                backgroundColor: item.danger
                  ? isDark
                    ? 'rgba(127, 29, 29, 0.2)'
                    : 'rgba(254, 242, 242, 1)'
                  : isDark
                    ? '#374151'
                    : '#f3f4f6',
              },
            }}
          >
            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>{item.icon}</Box>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default HomePage;
