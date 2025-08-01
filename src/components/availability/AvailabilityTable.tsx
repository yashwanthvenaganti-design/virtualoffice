import React from 'react';
import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
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
}

const AvailabilityTable: React.FC<AvailabilityTableProps> = ({
  rows,
  selectedRows,
  onSelectRow,
  onSelectAll,
  selectAll,
}) => {
  const theme = useTheme();

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.default,
        borderRadius: '1rem',
      }}
    >
      <Table size='medium' sx={{ minWidth: 650 }} aria-label='availability table'>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.background.paper
                  : theme.palette.grey[50],
              borderBottom: `1px solid ${theme.palette.divider}`,
              '& th': {
                paddingY: 1.5,
                paddingX: 2,
                fontWeight: 600,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                color: theme.palette.text.secondary,
              },
            }}
          >
            <TableCell padding='checkbox' sx={{ px: 1.5 }}>
              <Checkbox
                checked={selectAll}
                onChange={e => onSelectAll(e.target.checked)}
                inputProps={{ 'aria-label': 'Select all' }}
                size='small'
              />
            </TableCell>
            <TableCell>Status name</TableCell>
            <TableCell>Availability</TableCell>
            <TableCell>Tel no</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>SMS</TableCell>
            <TableCell align='right' sx={{ px: 2 }}>
              {/* empty header for actions */}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            const isSelected = selectedRows.includes(row.id);
            return (
              <TableRow
                hover
                key={row.id}
                selected={isSelected}
                sx={{
                  cursor: 'pointer',
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  backgroundColor: isSelected ? theme.palette.action.selected : 'inherit',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  '& td': {
                    paddingY: 1.25,
                    paddingX: 2,
                  },
                }}
              >
                <TableCell padding='checkbox' sx={{ px: 1.5 }}>
                  <Checkbox
                    checked={isSelected}
                    onChange={() => onSelectRow(row.id)}
                    inputProps={{ 'aria-label': `Select ${row.name}` }}
                    size='small'
                  />
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} fontSize={14} color={theme.palette.text.primary}>
                    {row.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={14} color={theme.palette.text.secondary}>
                    {row.availability}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={14} color={theme.palette.text.secondary}>
                    {row.tel}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={14} color={theme.palette.text.secondary}>
                    {row.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={14} color={theme.palette.text.secondary}>
                    {row.sms}
                  </Typography>
                </TableCell>
                <TableCell align='right' sx={{ px: 2 }}>
                  <IconButton size='small' aria-label={`Actions for ${row.name}`}>
                    <MoreVertIcon fontSize='small' sx={{ color: theme.palette.text.secondary }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AvailabilityTable;
