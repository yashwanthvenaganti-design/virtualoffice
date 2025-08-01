import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from '@mui/material';

interface FilterDropdownProps {
  selected: string;
  options: string[];
  onChange: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ selected, options, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl
      variant='outlined'
      size='small'
      className='!min-w-[220px]'
      sx={{
        '& .MuiOutlinedInput-root': {
          px: 2,
          py: 0.75,
          borderRadius: '0.5rem',
          transition: 'all 0.2s ease-in-out',
        },
        '& .MuiInputLabel-root': {
          fontWeight: 600,
        },
      }}
    >
      <InputLabel className='!text-gray-500 dark:!text-gray-400 !font-semibold focus:!text-blue-500 dark:focus:!text-blue-400'>
        Filter
      </InputLabel>
      <Select
        label='Filter'
        value={selected}
        onChange={handleChange}
        className='!bg-white dark:!bg-gray-800 !border-gray-200 dark:!border-gray-700 hover:!border-blue-500 dark:hover:!border-blue-400 focus:!border-blue-500 dark:focus:!border-blue-400 !text-gray-900 dark:!text-gray-100 !text-[14px] !rounded-lg'
        MenuProps={{
          PaperProps: {
            className:
              '!bg-white dark:!bg-gray-900 !rounded-lg !mt-2 !border !border-gray-200 dark:!border-gray-700 !shadow-lg',
            sx: {
              '& .MuiMenuItem-root': {
                fontSize: '14px',
                fontWeight: 500,
                padding: '8px 16px',
                margin: '2px 4px',
                borderRadius: '6px',
                color: 'rgb(17 24 39)', // gray-900
                '.dark & ': {
                  color: 'rgb(255 255 255)',
                },
                '&:hover': {
                  backgroundColor: 'rgb(243 244 246)',
                  '.dark & ': {
                    backgroundColor: 'rgb(55 65 81)',
                  },
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgb(239 246 255)', // blue-50
                  color: 'rgb(59 130 246)', // blue-500
                  '.dark & ': {
                    backgroundColor: 'rgb(30 58 138)', // blue-900
                    color: 'rgb(147 197 253)', // blue-300
                  },
                  '&:hover': {
                    backgroundColor: 'rgb(219 234 254)', // blue-100
                    '.dark & ': {
                      backgroundColor: 'rgb(30 64 175)', // blue-800
                    },
                  },
                },
              },
            },
          },
        }}
      >
        {options?.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterDropdown;
