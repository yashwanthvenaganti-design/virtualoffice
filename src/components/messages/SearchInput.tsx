import React from 'react';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search messages...',
}) => {
  return (
    <div
      className='relative w-full flex-1 min-w-0 max-w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 transition-all duration-200 hover:shadow-[0_0_0_2px_rgb(59_130_246_/_0.1)] dark:hover:shadow-[0_0_0_2px_rgb(96_165_250_/_0.2)] focus-within:shadow-[0_0_0_2px_rgb(59_130_246_/_0.2)] dark:focus-within:shadow-[0_0_0_2px_rgb(96_165_250_/_0.3)]'
      role='search'
    >
      <label htmlFor='search-input' className='sr-only'>
        Search messages
      </label>

      <div className='absolute h-full flex items-center justify-center pl-6 pointer-events-none'>
        <SearchIcon
          fontSize='small'
          className='text-gray-500 dark:text-gray-400'
          aria-hidden='true'
        />
      </div>

      <InputBase
        id='search-input'
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className='w-full min-w-0 flex-1 pl-12 pr-3 py-[9px] rounded-md text-gray-900 dark:text-gray-100'
        inputProps={{ 'aria-label': 'search messages' }}
        sx={{
          fontSize: '14px',
          '& input::placeholder': {
            color: 'rgb(107 114 128)',
            opacity: 1,
          },
          '.dark & input::placeholder': {
            color: 'rgb(156 163 175)',
          },
        }}
      />
    </div>
  );
};

export default SearchInput;
