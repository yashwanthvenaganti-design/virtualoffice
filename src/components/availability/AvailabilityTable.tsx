import React from 'react';
import { Checkbox, IconButton, Typography, useTheme, Box, Grid } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface RowData {
  id: number;
  name: string;
  availability: string;
  tel: string;
  email: string;
  sms: string;
}

interface AvailabilityTableProps {
  rows: RowData[];
  selectedRows: number[];
  onSelectRow: (id: number) => void;
  onSelectAll: (checked: boolean) => void;
  selectAll: boolean;
  onRowClick?: (event: React.MouseEvent<HTMLDivElement>, id: number) => void;
}

const AvailabilityTable: React.FC<AvailabilityTableProps> = ({
  rows,
  selectedRows,
  onSelectRow,
  onSelectAll,
  selectAll,
  onRowClick,
}) => {
  const theme = useTheme();

  const headers = [
    { key: 'select', label: '', colSpan: 1 },
    { key: 'name', label: 'Status name', colSpan: 2 },
    { key: 'availability', label: 'Availability', colSpan: 2 },
    { key: 'tel', label: 'Tel no', colSpan: 2 },
    { key: 'email', label: 'E-mail', colSpan: 2 },
    { key: 'sms', label: 'SMS', colSpan: 2 },
    { key: 'actions', label: '', colSpan: 1 },
  ];

  return (
    <div
      className='rounded-xl border overflow-hidden shadow-sm border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
      role='table'
      aria-label='Availability table'
    >
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
                    size='small'
                  />
                </Box>
              ) : label ? (
                <Typography
                  variant='caption'
                  className='!font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400'
                  role='columnheader'
                >
                  {label}
                </Typography>
              ) : null}
            </Grid>
          ))}
        </Grid>
      </Box>

      <div className='divide-y divide-gray-200 dark:divide-gray-700' role='rowgroup'>
        {rows?.map(row => {
          const isSelected = selectedRows.includes(row.id);
          return (
            <Box
              key={row.id}
              role='row'
              aria-selected={isSelected}
              className='flex flex-col transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
              onClick={event => onRowClick?.(event, row.id)}
            >
              <Box px={1} py={1} flex={1}>
                <Grid container alignItems='center' spacing={2}>
                  <Grid item xs={1}>
                    <Box display='flex' alignItems='center' justifyContent='center'>
                      <Checkbox
                        checked={isSelected}
                        onChange={() => onSelectRow(row.id)}
                        size='small'
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      fontWeight={600}
                      className='text-sm text-gray-900 dark:text-gray-200'
                    >
                      {row.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography className='text-sm text-gray-600 dark:text-gray-300'>
                      {row.availability}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography className='text-sm text-gray-600 dark:text-gray-300'>
                      {row.tel}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography className='text-sm text-gray-600 dark:text-gray-300'>
                      {row.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography className='text-sm text-gray-600 dark:text-gray-300'>
                      {row.sms}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton size='small'>
                      <MoreVertIcon fontSize='small' sx={{ color: theme.palette.text.secondary }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          );
        })}
      </div>

      {/* Empty state */}
      {rows.length === 0 && (
        <div className='p-8 text-center text-gray-500 dark:text-gray-400'>
          <p>No availability data</p>
        </div>
      )}
    </div>
  );
};

export default AvailabilityTable;
