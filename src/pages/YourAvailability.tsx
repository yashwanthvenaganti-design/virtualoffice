import React, { useCallback, useState, useMemo } from 'react';
import PageHeader from '../components/common/PageHeader';
import FilterDropdown from '../components/common/FilterDropdown';
import ActionsDropdown from '../components/common/ActionsDropdown';
import AvailabilityTable from '../components/availability/AvailabilityTable';
import Add from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchInput from '../components/messages/SearchInput';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { useAvailabilities, useDeleteAvailabilities } from '../hooks/useAvailability';
import type { AvailabilityItem } from '../types/availability';

const PEOPLE_ID = import.meta.env.VITE_APP_PEOPLE_ID;

const YourAvailability: React.FC = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Status Name');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const {
    data: availabilitiesResponse,
    isLoading,
    error,
    refetch,
  } = useAvailabilities(
    { peopleId: PEOPLE_ID },
    {
      onError: error => {
        console.error('Failed to fetch availabilities:', error);
      },
    }
  );

  // Delete mutation
  const deleteMutation = useDeleteAvailabilities({
    onSuccess: data => {
      console.log('✅ Successfully deleted availabilities:', data);
      setSelectedRows([]);
      setSelectAll(false);
      // Show success message or toast
    },
    onError: error => {
      console.error('❌ Failed to delete availabilities:', error);
      // Show error message or toast
    },
  });

  const filterOptions = ['Status Name', 'Tel No'];

  // Transform API data to match table component expectations
  const availabilities = availabilitiesResponse?.data || [];

  // Filter and search logic
  const filteredAvailabilities = useMemo(() => {
    if (!availabilities.length) return [];

    return availabilities.filter((item: AvailabilityItem) => {
      if (!searchQuery) return true;

      const query = searchQuery.toLowerCase();

      switch (selectedFilter) {
        case 'Status Name':
          return item.name.toLowerCase().includes(query);
        case 'Tel No':
          return item.telNo.toLowerCase().includes(query);
        default:
          // Search in name and tel if no specific filter
          return (
            item.name.toLowerCase().includes(query) || item.telNo.toLowerCase().includes(query)
          );
      }
    });
  }, [availabilities, searchQuery, selectedFilter]);

  // Transform data for the table component
  const tableData = useMemo(() => {
    return filteredAvailabilities.map((item: AvailabilityItem) => ({
      id: item.availabilitiesId, // Use availabilitiesId as the table row id
      name: item.name,
      availability: item.available ? item.availability : 'Unavailable',
      tel: item.telNo,
      email: item.email ? item.emailAddr || 'Enabled' : 'Disabled',
      sms: item.sms ? 'Enabled' : 'Disabled',
    }));
  }, [filteredAvailabilities]);

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => {
      const updated = prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id];
      setSelectAll(updated.length === tableData.length);
      return updated;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSelectedRows(checked ? tableData.map(row => row.id) : []);
  };

  const handleRowClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, id: string) => {
      // Prevent click from selecting checkbox when user clicks the checkbox
      if ((event.target as HTMLElement).closest('input[type="checkbox"]')) return;
      navigate(`/availability/${id}`);
    },
    [navigate]
  );

  const handleAdd = () => {
    navigate('/availability/new');
  };

  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      console.log('No items selected for deletion');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedRows.length} item(s)?`)) {
      try {
        await deleteMutation.mutateAsync(selectedRows);
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleRetry = () => {
    refetch();
  };

  // Loading state
  if (isLoading) {
    return (
      <main className='flex-1 flex flex-col min-h-0' role='main'>
        <PageHeader
          icon={CalendarMonthIcon}
          title='Your availability'
          description='Manage your availability across locations and roles'
        />
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center space-y-4'>
            <CircularProgress size={48} />
            <div>
              <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                Loading availabilities...
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Please wait while we fetch your availability data.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className='flex-1 flex flex-col min-h-0' role='main'>
        <PageHeader
          icon={CalendarMonthIcon}
          title='Your availability'
          description='Manage your availability across locations and roles'
        />
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center space-y-4'>
            <div>
              <h3 className='text-lg font-semibold text-red-600 dark:text-red-400'>
                Failed to Load Availabilities
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-md'>
                {error.message || 'There was an error loading your availability data.'}
              </p>
            </div>
            <div className='flex gap-3 justify-center'>
              <button
                onClick={handleRetry}
                className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
              >
                Try Again
              </button>
              <button
                onClick={handleAdd}
                className='px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
              >
                Add New Availability
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Empty state
  if (availabilities.length === 0) {
    return (
      <main className='flex-1 flex flex-col min-h-0' role='main'>
        <PageHeader
          icon={CalendarMonthIcon}
          title='Your availability'
          description='Manage your availability across locations and roles'
        />
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center space-y-4'>
            <CalendarMonthIcon className='w-16 h-16 text-gray-400 mx-auto' />
            <div>
              <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                No availabilities found
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
                Get started by creating your first availability status.
              </p>
            </div>
            <button
              onClick={handleAdd}
              className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
            >
              <Add className='w-4 h-4 mr-2' />
              Add Availability
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className='flex-1 flex flex-col min-h-0'
      role='main'
      aria-label='Your Availability Dashboard'
    >
      <PageHeader
        icon={CalendarMonthIcon}
        title='Your availability'
        description='Manage your availability across locations and roles'
      />

      <section
        className='flex-shrink-0 p-3 border-b border-gray-200 bg-white/80 dark:border-gray-700 dark:bg-gray-800/50 backdrop-blur-sm'
        aria-label='Availability controls'
      >
        <div className='flex flex-col lg:flex-row gap-4'>
          <FilterDropdown
            selected={selectedFilter}
            options={filterOptions}
            onChange={setSelectedFilter}
          />

          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder='Search by name or tel...'
          />

          <ActionsDropdown
            items={[
              {
                icon: Add,
                label: 'Add Availability',
                action: handleAdd,
              },
              {
                icon: DeleteIcon,
                label: `Delete Selected (${selectedRows.length})`,
                action: handleDelete,
                isDanger: true,
                disabled: selectedRows.length === 0 || deleteMutation.isPending,
              },
            ]}
          />
        </div>

        {/* Show selected count */}
        {selectedRows.length > 0 && (
          <div className='mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md'>
            <p className='text-sm text-blue-700 dark:text-blue-300'>
              {selectedRows.length} item(s) selected
              {deleteMutation.isPending && (
                <span className='ml-2'>
                  <CircularProgress size={12} className='text-blue-600' />
                  <span className='ml-1'>Deleting...</span>
                </span>
              )}
            </p>
          </div>
        )}
      </section>

      <section className='flex-1 p-2 overflow-auto' aria-label='Availability Table'>
        <AvailabilityTable
          rows={tableData}
          selectedRows={selectedRows}
          selectAll={selectAll}
          onSelectRow={handleSelectRow}
          onSelectAll={handleSelectAll}
          onRowClick={handleRowClick}
        />
      </section>
    </main>
  );
};

export default YourAvailability;
