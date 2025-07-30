import React, { useState, useRef, useEffect } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FilterDropdownProps {
  selectedFilter: string;
  filterOptions: string[];
  onFilterChange: (filter: string) => void;
  isDark: boolean;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  selectedFilter,
  filterOptions,
  onFilterChange,
  isDark,
}) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
      }
    };

    if (showFilterMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showFilterMenu]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setShowFilterMenu(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    onFilterChange(option);
    setShowFilterMenu(false);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setShowFilterMenu(!showFilterMenu)}
        onKeyDown={handleKeyDown}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 hover:shadow-md ${
          isDark
            ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:border-gray-500'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
        }`}
        aria-expanded={showFilterMenu}
        aria-haspopup='listbox'
        aria-label={`Filter messages. Current filter: ${selectedFilter}`}
        id='filter-button'
      >
        <FilterListIcon className='w-4 h-4' aria-hidden='true' />
        <span>{selectedFilter}</span>
        <ExpandMoreIcon
          className={`w-4 h-4 transition-transform duration-200 ${showFilterMenu ? 'rotate-180' : ''}`}
          aria-hidden='true'
        />
      </button>

      {showFilterMenu && (
        <div
          className={`absolute top-full mt-2 w-64 rounded-xl shadow-xl border z-50 ${
            isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
          } backdrop-blur-sm`}
          role='listbox'
          aria-labelledby='filter-button'
          onKeyDown={handleKeyDown}
        >
          <ul className='p-2' role='none'>
            {filterOptions.map(option => (
              <li key={option} role='none'>
                <button
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors ${
                    selectedFilter === option
                      ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  role='option'
                  aria-selected={selectedFilter === option}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
