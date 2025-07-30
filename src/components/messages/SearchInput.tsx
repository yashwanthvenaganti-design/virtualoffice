import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isDark: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search messages...',
  isDark,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className='flex-1 max-w-md relative' role='search'>
      <label htmlFor='message-search' className='sr-only'>
        Search messages
      </label>
      <SearchIcon
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}
        aria-hidden='true'
      />
      <input
        id='message-search'
        type='search'
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 ${
          isDark
            ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500 focus:bg-gray-750'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-blue-50/30'
        } focus:outline-none`}
        aria-describedby='search-help'
      />
      <div id='search-help' className='sr-only'>
        Search through all messages by sender, subject, company, or content
      </div>
    </div>
  );
};

export default SearchInput;
