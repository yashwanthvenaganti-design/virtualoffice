import React from 'react';
import { InputBase, alpha } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isDark: boolean;
}

const SearchWrapper = styled('div')<{ isDark: boolean }>(({ theme, isDark }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '420px',
  borderRadius: 6,
  backgroundColor: isDark ? theme.palette.grey[800] : theme.palette.common.white,
  border: `1px solid ${isDark ? theme.palette.grey[700] : theme.palette.grey[300]}`,
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: isDark
      ? `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
      : `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: theme.spacing(1.5),
  pointerEvents: 'none',
}));

const StyledInput = styled(InputBase)<{ isDark: boolean }>(({ theme, isDark }) => ({
  color: isDark ? theme.palette.grey[100] : theme.palette.text.primary,
  width: '100%',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2),
  paddingTop: 8,
  paddingBottom: 8,
  fontSize: '0.875rem',
  borderRadius: 6,
  '&::placeholder': {
    color: isDark ? theme.palette.grey[400] : theme.palette.grey[500],
  },
}));

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search messages...',
  isDark,
}) => {
  return (
    <SearchWrapper isDark={isDark} role='search'>
      <label htmlFor='search-input' className='sr-only'>
        Search messages
      </label>
      <SearchIconWrapper>
        <SearchIcon
          fontSize='small'
          sx={{ color: isDark ? 'grey.400' : 'grey.500' }}
          aria-hidden='true'
        />
      </SearchIconWrapper>
      <StyledInput
        id='search-input'
        isDark={isDark}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        inputProps={{ 'aria-label': 'search messages' }}
      />
    </SearchWrapper>
  );
};

export default SearchInput;
