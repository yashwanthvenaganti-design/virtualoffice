import React from 'react';
import { Box, Checkbox, Grid, Typography, useTheme } from '@mui/material';

interface MessageTableHeaderProps {
  selectAll: boolean;
  onSelectAll: (checked: boolean) => void;
  isDark: boolean;
}

const MessageTableHeader: React.FC<MessageTableHeaderProps> = ({
  selectAll,
  onSelectAll,
  isDark,
}) => {
  const theme = useTheme();

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
      sx={{
        px: 1,
        py: 0.5,
        borderBottom: `1px solid ${isDark ? theme.palette.grey[700] : theme.palette.grey[200]}`,
        backgroundColor: isDark ? 'rgba(31,41,55,0.8)' : 'rgba(249,250,251,0.8)',
        backdropFilter: 'blur(6px)',
      }}
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
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  color: isDark ? theme.palette.grey[400] : theme.palette.grey[600],
                }}
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
