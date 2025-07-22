import React, { useState } from 'react';
import { InputBase, IconButton, Fade } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  maxWidth?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search workspace...',
  maxWidth = 480,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
      <div
        className={`
          relative rounded-xl border transition-all duration-200 ease-in-out
          ${
            isSearchFocused
              ? 'border-primary-500 bg-surface shadow-sm ring-2 ring-primary-500/10'
              : 'border-border bg-surface-alt hover:bg-surface hover:border-border-hover'
          }
        `}
      >
        <div className='flex items-center px-4 py-2.5'>
          <SearchIcon className='text-muted mr-3 flex-shrink-0' sx={{ fontSize: 20 }} />

          <InputBase
            placeholder={placeholder}
            value={value}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className='flex-1 text-sm'
            sx={{
              '& .MuiInputBase-input': {
                padding: 0,
                color: 'rgb(var(--color-text-primary))',
                '&::placeholder': {
                  color: 'rgb(var(--color-text-secondary))',
                  opacity: 1,
                },
              },
            }}
          />

          {value && (
            <Fade in>
              <IconButton
                size='small'
                onClick={handleClear}
                className='ml-2 hover:bg-surface-alt'
                sx={{
                  color: 'rgb(var(--color-text-secondary))',
                  '&:hover': {
                    backgroundColor: 'rgba(var(--color-text-secondary), 0.1)',
                  },
                }}
              >
                <ClearIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Fade>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
