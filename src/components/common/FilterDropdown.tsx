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
          borderRadius: '0.375rem',
          transition: 'all 0.2s ease-in-out',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '2px',
          },
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          },
          '&.Mui-focused': {
            transform: 'scale(1.02)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
          },
        },
        '& .MuiInputLabel-root': {
          fontWeight: 600,
          fontSize: '14px',
        },
      }}
    >
      <InputLabel className='!text-gray-500 dark:!text-gray-400 !font-semibold'>Filter</InputLabel>
      <Select
        label='Filter'
        value={selected}
        onChange={handleChange}
        className='!bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-gray-100 !text-[14px] !font-medium !shadow-sm'
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(229 231 235)',
            '.dark &': {
              borderColor: 'rgb(55 65 81)',
            },
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(59 130 246)',
            '.dark &': {
              borderColor: 'rgb(96 165 250)',
            },
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(59 130 246) !important',
            '.dark &': {
              borderColor: 'rgb(96 165 250) !important',
            },
          },
          '&.Mui-focused': {
            outline: '2px solid transparent',
            outlineOffset: '2px',
            boxShadow: '0 0 0 3px rgb(59 130 246 / 0.1)',
            '.dark &': {
              boxShadow: '0 0 0 3px rgb(96 165 250 / 0.2)',
            },
          },
        }}
        MenuProps={{
          PaperProps: {
            className:
              '!bg-white dark:!bg-gray-800 !rounded-lg !mt-2 !border !border-gray-200 dark:!border-gray-700 !shadow-lg',
            sx: {
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              '.dark &': {
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
              },
              '& .MuiMenuItem-root': {
                fontSize: '14px',
                fontWeight: 500,
                padding: '8px 16px',
                margin: '2px 4px',
                borderRadius: '6px',
                color: 'rgb(17 24 39)',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                '.dark & ': {
                  color: 'rgb(255 255 255)',
                },
                '&:hover': {
                  backgroundColor: 'rgb(243 244 246)',
                  transform: 'scale(1.02)',
                  '.dark & ': {
                    backgroundColor: 'rgb(55 65 81)',
                  },
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgb(239 246 255)',
                  color: 'rgb(59 130 246)',
                  fontWeight: 600,
                  '.dark & ': {
                    backgroundColor: 'rgb(30 58 138)',
                    color: 'rgb(147 197 253)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgb(219 234 254)',
                    transform: 'scale(1.02)',
                    '.dark & ': {
                      backgroundColor: 'rgb(30 64 175)',
                    },
                  },
                },
                '&.Mui-focusVisible': {
                  outline: '2px solid rgb(59 130 246)',
                  outlineOffset: '2px',
                  '.dark &': {
                    outline: '2px solid rgb(96 165 250)',
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
