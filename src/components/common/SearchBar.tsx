// components/SearchBar.tsx - Simplified without focus state
import React from 'react';
import { InputBase, IconButton, Fade } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon, FilterList } from '@mui/icons-material';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  maxWidth?: number;
  showFilters?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search workspace...',
  maxWidth = 600,
  showFilters = false,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    onChange(query);
    onSearch?.(query);
  };

  const handleClear = () => {
    onChange('');
    onSearch?.('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch?.(value);
    }
  };

  return (
    <div className='flex-1' style={{ maxWidth }}>
      <div className='relative rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 ease-out hover:shadow-md focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/20 dark:focus-within:ring-blue-400/20 focus-within:shadow-lg'>
        <div className='flex items-center px-4 py-1'>
          <SearchIcon
            className='mr-3 text-gray-500 dark:text-gray-400 transition-colors duration-200 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400'
            sx={{ fontSize: 20 }}
          />

          <InputBase
            placeholder={placeholder}
            value={value}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            className='flex-1 text-sm font-medium text-gray-900 dark:text-gray-100'
            sx={{
              '& input::placeholder': {
                color: 'rgb(107 114 128)',
                opacity: 1,
              },
              '.dark & input::placeholder': {
                color: 'rgb(156 163 175)',
              },
            }}
          />

          <div className='flex items-center gap-1 ml-2'>
            {showFilters && (
              <IconButton
                size='small'
                className='!text-gray-500 dark:!text-gray-400 hover:!bg-gray-100 dark:hover:!bg-gray-700 hover:!text-gray-700 dark:hover:!text-gray-300 !transition-colors !duration-200'
              >
                <FilterList sx={{ fontSize: 16 }} />
              </IconButton>
            )}

            {value && (
              <Fade in>
                <IconButton
                  size='small'
                  onClick={handleClear}
                  className='!text-gray-500 dark:!text-gray-400 hover:!bg-gray-100 dark:hover:!bg-gray-700 hover:!text-gray-700 dark:hover:!text-gray-300 !transition-colors !duration-200'
                >
                  <ClearIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Fade>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
