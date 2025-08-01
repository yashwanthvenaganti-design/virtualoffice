import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from '@mui/material';

interface FilterDropdownProps {
  selected: string;
  options: string[];
  isDark: boolean;
  onChange: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ selected, options, isDark, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl
      variant='outlined'
      size='small'
      sx={{
        minWidth: 220,
        bgcolor: isDark ? 'grey.900' : 'white',
        color: isDark ? 'grey.100' : 'grey.900',
        '& .MuiOutlinedInput-root': {
          color: isDark ? 'grey.100' : 'grey.900',
          px: 2,
          py: 0.5,
          borderRadius: 0.5,
          '& fieldset': {
            borderColor: isDark ? 'grey.700' : 'grey.300',
          },
          '&:hover fieldset': {
            borderColor: isDark ? 'grey.500' : 'grey.500',
          },
        },
      }}
    >
      <InputLabel
        sx={{
          color: isDark ? 'grey.300' : 'grey.700',
        }}
      >
        Filter
      </InputLabel>
      <Select
        label='Filter'
        value={selected}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: isDark ? 'grey.900' : 'white',
              color: isDark ? 'grey.100' : 'grey.900',
            },
          },
        }}
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterDropdown;
