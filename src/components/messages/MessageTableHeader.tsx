import React from 'react';
import { Box, Checkbox, Grid, Typography } from '@mui/material';

interface MessageTableHeaderProps {
  selectAll: boolean;
  onSelectAll: (checked: boolean) => void;
}

const MessageTableHeader: React.FC<MessageTableHeaderProps> = ({ selectAll, onSelectAll }) => {
  const headers = [
    { key: 'select', label: '', colSpan: 1 },
    { key: 'from', label: 'From', colSpan: 2 },
    { key: 'subject', label: 'Subject', colSpan: 4 },
    { key: 'company', label: 'Company', colSpan: 2 },
    { key: 'date', label: 'Date', colSpan: 2 },
    { key: 'actions', label: '', colSpan: 1 },
  ];

  return (
    <Box
      component='header'
      role='rowheader'
      className='px-2 py-1 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 backdrop-blur-sm'
    >
      <Grid container alignItems='center' spacing={2}>
        {headers?.map(({ key, label, colSpan }) => (
          <Grid item xs={colSpan} key={key}>
            {key === 'select' ? (
              <Box display='flex' alignItems='center' justifyContent='center'>
                <Checkbox
                  checked={selectAll}
                  onChange={e => onSelectAll(e.target.checked)}
                  inputProps={{ 'aria-label': 'Select all messages' }}
                  size='small'
                />
              </Box>
            ) : label ? (
              <Typography
                variant='caption'
                className='!font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400'
                role='columnheader'
                aria-sort='none'
              >
                {label}
              </Typography>
            ) : null}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MessageTableHeader;
