import React, { useState } from 'react';
import { InputBase, IconButton, Fade } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon, FilterList } from '@mui/icons-material';
import { useTheme } from '../../theme/ThemeContext';

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
  const { isDark } = useTheme();
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
          relative rounded-2xl border transition-all duration-300 ease-out group
          ${
            isSearchFocused
              ? isDark
                ? 'border-blue-400 bg-gray-800/90 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/20'
                : 'border-blue-500 bg-white shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/10'
              : isDark
                ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 hover:border-gray-600'
                : 'border-gray-200 bg-gray-50/80 hover:bg-white hover:border-gray-300'
          }
        `}
      >
        <div className='flex items-center px-4 py-3'>
          <SearchIcon
            className={`flex-shrink-0 mr-3 transition-colors duration-200 ${
              isSearchFocused
                ? 'text-blue-500'
                : isDark
                  ? 'text-gray-400 group-hover:text-gray-300'
                  : 'text-gray-500 group-hover:text-gray-700'
            }`}
            sx={{ fontSize: 20 }}
          />

          <InputBase
            placeholder={placeholder}
            value={value}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className='flex-1 text-sm font-medium'
            sx={{
              '& .MuiInputBase-input': {
                padding: 0,
                color: isDark ? '#ffffff' : '#1f2937',
                fontWeight: 500,
                '&::placeholder': {
                  color: isDark ? '#9ca3af' : '#6b7280',
                  opacity: 1,
                  fontWeight: 400,
                },
              },
            }}
          />

          {/* Actions */}
          <div className='flex items-center gap-1 ml-2'>
            {/* Filters Button */}
            {showFilters && (
              <IconButton
                size='small'
                className={`transition-colors duration-200 ${
                  isDark
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300'
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
              >
                <FilterList sx={{ fontSize: 16 }} />
              </IconButton>
            )}

            {/* Clear Button */}
            {value && (
              <Fade in>
                <IconButton
                  size='small'
                  onClick={handleClear}
                  className={`transition-colors duration-200 ${
                    isDark
                      ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300'
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <ClearIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Fade>
            )}
          </div>
        </div>

        {isSearchFocused && !value && (
          <div
            className={`absolute top-full left-0 right-0 mt-2 p-3 rounded-xl border shadow-lg z-50 ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <div className='space-y-2'>
              <div
                className={`text-xs font-semibold uppercase tracking-wide ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Quick Search
              </div>
              <div className='flex flex-wrap gap-2'>
                {['Recent Files', 'My Tasks', 'Team Members', 'Projects'].map(item => (
                  <button
                    key={item}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      isDark
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => {
                      onChange(item);
                      onSearch?.(item);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
