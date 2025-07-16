import React, { useState } from 'react';
import { Box, InputBase, IconButton, Paper, useTheme, alpha, Fade } from '@mui/material';
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
  placeholder = 'Search...',
  maxWidth = 480,
}) => {
  const theme = useTheme();
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
    <Box sx={{ flexGrow: 1, maxWidth, mx: 3 }}>
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          borderRadius: 3,
          backgroundColor: alpha(theme.palette.grey[100], 0.8),
          border: `1px solid ${isSearchFocused ? theme.palette.primary.main : 'transparent'}`,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[100], 1),
          },
          ...(isSearchFocused && {
            boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
          }),
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
          <SearchIcon
            sx={{
              color: theme.palette.text.secondary,
              mr: 1,
              fontSize: 20,
            }}
          />
          <InputBase
            placeholder={placeholder}
            value={value}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            sx={{
              flex: 1,
              fontSize: '0.875rem',
              '& .MuiInputBase-input': {
                padding: 0,
                '&::placeholder': {
                  color: theme.palette.text.secondary,
                  opacity: 1,
                },
              },
            }}
          />
          {value && (
            <Fade in>
              <IconButton size='small' onClick={handleClear} sx={{ ml: 1 }}>
                <ClearIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Fade>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default SearchBar;
