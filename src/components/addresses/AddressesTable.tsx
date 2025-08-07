import React from 'react';
import { Checkbox, IconButton, Typography, useTheme, Box, Grid, Chip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface AddressRowData {
  id: number;
  name: string;
  isDefault: boolean;
  landmark: string;
  companyTelNo: string;
  addrLine1: string;
  postcode: string;
}

interface AddressTableProps {
  rows: AddressRowData[];
  selectedRows: number[];
  onSelectRow: (id: number) => void;
  onSelectAll: (checked: boolean) => void;
  selectAll: boolean;
  onRowClick?: (event: React.MouseEvent<HTMLDivElement>, id: number) => void;
  onEditAddress?: (id: number) => void;
}

export const AddressTable: React.FC<AddressTableProps> = ({
  rows,
  selectedRows,
  onSelectRow,
  onSelectAll,
  selectAll,
  onRowClick,
  onEditAddress,
}) => {
  const theme = useTheme();

  const headers = [
    { key: 'select', label: '', colSpan: 1 },
    { key: 'name', label: 'Name', colSpan: 2 },
    { key: 'landmark', label: 'Landmark', colSpan: 2 },
    { key: 'companyTelNo', label: 'Company tel no', colSpan: 2 },
    { key: 'addrLine1', label: 'Addr line 1', colSpan: 3 },
    { key: 'postcode', label: 'Postcode', colSpan: 1 },
    { key: 'actions', label: '', colSpan: 1 },
  ];

  return (
    <div
      className='rounded-xl border overflow-hidden shadow-sm border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
      role='table'
      aria-label='Address table'
    >
      {/* Header */}
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
                    indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
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

      {/* Rows */}
      <div className='divide-y divide-gray-200 dark:divide-gray-700' role='rowgroup'>
        {rows?.map(row => {
          const isSelected = selectedRows.includes(row?.id);
          return (
            <Box
              key={row.id}
              role='row'
              aria-selected={isSelected}
              className='group transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
              onClick={event => onRowClick?.(event, row?.id)}
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
                      <div className='flex flex-col flex-1 min-w-0'>
                        <div className='flex items-center gap-2'>
                          <Typography
                            className={`text-sm font-semibold truncate ${
                              row.isDefault
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-gray-900 dark:text-gray-200'
                            }`}
                            title={row.name}
                          >
                            {row.name}
                          </Typography>

                          <IconButton
                            size='small'
                            onClick={e => {
                              e.stopPropagation();
                              onEditAddress?.(row.id);
                            }}
                            className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 !p-1 flex-shrink-0'
                          >
                            <EditIcon
                              fontSize='small'
                              className='w-4 h-4 text-gray-400 hover:text-gray-600'
                            />
                          </IconButton>
                        </div>
                        {row?.isDefault && (
                          <Chip
                            label='default'
                            size='small'
                            className='!bg-gray-100 !text-gray-600 dark:!bg-gray-700 dark:!text-gray-300 !text-xs !h-5 !font-medium mt-1 self-start'
                          />
                        )}
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      className='text-sm text-gray-600 dark:text-gray-400 truncate'
                      title={row.landmark || ''}
                    >
                      {row.landmark || '•'}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      className='text-sm text-gray-600 dark:text-gray-400 truncate'
                      title={row.companyTelNo}
                    >
                      {row.companyTelNo}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      className='text-sm text-gray-600 dark:text-gray-400 truncate'
                      title={row.addrLine1}
                    >
                      {row.addrLine1}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography
                      className='text-sm text-gray-600 dark:text-gray-400 truncate'
                      title={row.postcode}
                    >
                      {row.postcode}
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
          <LocationOnIcon className='w-8 h-8 mx-auto mb-2 opacity-50' />
          <p>No addresses found</p>
        </div>
      )}
    </div>
  );
};

export default AddressTable;
