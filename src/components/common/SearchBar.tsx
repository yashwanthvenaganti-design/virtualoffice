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
      <div
        className={`
        relative rounded-xl border-2 transition-all duration-300 ease-out group
        bg-header-light-searchBg border-header-light-searchBorder shadow-search
        dark:bg-header-dark-searchBg dark:border-header-dark-searchBorder dark:shadow-search
        hover:border-header-light-searchFocus/50 hover:shadow-search-focus
        dark:hover:border-header-dark-searchFocus/50
        focus-within:border-header-light-searchFocus focus-within:ring-4 focus-within:ring-header-light-searchFocus/10 focus-within:shadow-search-focus
        dark:focus-within:border-header-dark-searchFocus dark:focus-within:ring-header-dark-searchFocus/10
      `}
      >
        <div className='flex items-center px-4 py-1.5'>
          <SearchIcon
            className={`
              mr-3 transition-colors duration-200
              text-header-light-textMuted group-focus-within:text-header-light-searchFocus
              dark:text-header-dark-textMuted dark:group-focus-within:text-header-dark-searchFocus
            `}
            sx={{ fontSize: 20 }}
          />

          <InputBase
            placeholder={placeholder}
            value={value}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            className={`
              flex-1 text-sm font-medium
              text-header-light-text dark:text-header-dark-text
            `}
            sx={{
              '& input::placeholder': {
                color: 'rgb(var(--color-header-light-textMuted, 100 116 139))',
                opacity: 1,
                fontWeight: 400,
              },
              '.dark & input::placeholder': {
                color: 'rgb(var(--color-header-dark-textMuted, 148 163 184))',
              },
            }}
          />

          <div className='flex items-center gap-1 ml-2'>
            {showFilters && (
              <IconButton
                size='small'
                className={`
                  !transition-all !duration-200 !rounded-lg
                  !text-header-light-textMuted hover:!bg-header-light-hover hover:!text-header-light-text
                  dark:!text-header-dark-textMuted dark:hover:!bg-header-dark-hover dark:hover:!text-header-dark-text
                `}
                sx={{
                  width: 32,
                  height: 32,
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <FilterList sx={{ fontSize: 16 }} />
              </IconButton>
            )}

            {value && (
              <Fade in>
                <IconButton
                  size='small'
                  onClick={handleClear}
                  className={`
                    !transition-all !duration-200 !rounded-lg
                    !text-header-light-textMuted hover:!bg-header-light-hover hover:!text-header-light-text
                    dark:!text-header-dark-textMuted dark:hover:!bg-header-dark-hover dark:hover:!text-header-dark-text
                  `}
                  sx={{
                    width: 32,
                    height: 32,
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <ClearIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Fade>
            )}
          </div>
        </div>

        {/* Search suggestions indicator */}
        {value && (
          <div className='absolute top-full left-0 right-0 mt-1 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200'>
            <div
              className={`
              text-xs px-4 py-2 rounded-lg
              text-header-light-textMuted bg-header-light-surface border border-header-light-border
              dark:text-header-dark-textMuted dark:bg-header-dark-surface dark:border-header-dark-border
            `}
            >
              Press Enter to search or continue typing...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
