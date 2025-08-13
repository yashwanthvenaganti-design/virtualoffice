import React from 'react';
import { Checkbox, IconButton, Typography, useTheme, Box, Grid, Badge } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';

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
    { key: 'email', label: 'E-mail', colSpan: 3 },
    { key: 'sms', label: 'SMS', colSpan: 1 },
    { key: 'actions', label: '', colSpan: 1 },
  ];

  const selectedCount = selectedRows?.length;

  return (
    <div
      className='rounded-xl border overflow-hidden shadow-sm border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
      role='table'
      aria-label='Availability table'
    >
      <Box
        component='header'
        role='rowheader'
        className='px-2 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 backdrop-blur-sm'
      >
        <Grid container alignItems='center' spacing={2}>
          {headers?.map(({ key, label, colSpan }) => (
            <Grid item xs={colSpan} key={key}>
              {key === 'select' ? (
                <Box display='flex' alignItems='center' justifyContent='center'>
                  <Badge
                    badgeContent={selectedCount}
                    color='primary'
                    max={999}
                    invisible={selectedCount === 0}
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        fontWeight: 600,
                        fontSize: '0.65rem',
                        minWidth: '16px',
                        height: '16px',
                        borderRadius: '8px',
                        border: '1.5px solid',
                        borderColor: theme.palette.background.paper,
                        boxShadow: `0 2px 6px ${theme.palette.primary.main}30`,
                        transform: 'scale(1) translate(40%, -40%)',
                        transformOrigin: '100% 0%',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 32,
                        height: 32,
                        cursor: 'pointer',
                      }}
                      onClick={e => {
                        e.stopPropagation();
                        onSelectAll(!selectAll);
                      }}
                    >
                      <Checkbox
                        checked={selectAll}
                        onChange={e => onSelectAll(e.target.checked)}
                        size='small'
                        indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                        sx={{
                          color: theme.palette.text.secondary,
                          '&.Mui-checked': {
                            color: theme.palette.primary.main,
                          },
                          '&.MuiCheckbox-indeterminate': {
                            color: theme.palette.primary.main,
                          },
                          padding: 0,
                        }}
                      />
                    </Box>
                  </Badge>
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
              className='group flex flex-col transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
              onClick={event => onRowClick?.(event, row.id)}
            >
              <Box px={1} py={1} flex={1}>
                <Grid container alignItems='center' spacing={2}>
                  <Grid item xs={1}>
                    <Box display='flex' alignItems='center' justifyContent='center'>
                      <Checkbox
                        checked={isSelected}
                        onChange={e => {
                          e.stopPropagation();
                          onSelectRow(row.id);
                        }}
                        size='small'
                        className='opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                        style={{
                          opacity: isSelected ? 1 : undefined,
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <div className='flex items-center gap-2'>
                      <Typography
                        fontWeight={600}
                        className='text-sm text-gray-900 dark:text-gray-200 truncate'
                        title={row.name}
                      >
                        {row.name}
                      </Typography>
                      <IconButton
                        size='small'
                        onClick={e => {
                          e.stopPropagation();
                          onRowClick?.(e as unknown as React.MouseEvent<HTMLDivElement>, row.id);
                        }}
                        className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 !p-1 flex-shrink-0'
                      >
                        <EditIcon
                          fontSize='small'
                          className='w-4 h-4 text-gray-400 hover:text-gray-600'
                        />
                      </IconButton>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      className='text-sm text-gray-600 dark:text-gray-300 truncate'
                      title={row.availability}
                    >
                      {row.availability}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      className='text-sm text-gray-600 dark:text-gray-300 truncate'
                      title={row.tel}
                    >
                      {row.tel}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      className='text-sm text-gray-600 dark:text-gray-300 truncate'
                      title={row.email}
                    >
                      {row.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography
                      className='text-sm text-gray-600 dark:text-gray-300 truncate'
                      title={row.sms}
                    >
                      {row.sms}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      size='small'
                      className='opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                      onClick={e => e.stopPropagation()}
                    >
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
