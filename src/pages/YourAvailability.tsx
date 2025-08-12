import React, { useCallback, useState, useMemo, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import FilterDropdown from '../components/common/FilterDropdown';
import ActionsDropdown from '../components/common/ActionsDropdown';
import Add from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchInput from '../components/messages/SearchInput';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { useAvailabilities, useDeleteAvailabilities } from '../hooks/useAvailability';
import type { AvailabilityItem } from '../types/availability';
import AvailabilityTableWrapper from './AvailabilityTableWrapper';
import toast from 'react-hot-toast';

const PEOPLE_ID = import.meta.env.VITE_APP_PEOPLE_ID;

const YourAvailability: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    const state = location.state as any;

    if (state?.refreshData) {
      // Method 1: Refetch data from server (ensures fresh data)
      refetch();

      // Method 2: Alternative - invalidate queries to trigger automatic refetch
      // queryClient.invalidateQueries({ queryKey: ['availabilities'] });

      // Show success message if provided
      if (state.message) {
        toast.success(state.message);
      }

      // Clear the state to prevent repeated refreshes
      navigate(location.pathname, { replace: true, state: undefined });
    }
  }, [location.state, refetch, navigate, location.pathname]);

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

  const availabilities = availabilitiesResponse?.data || [];

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
          return (
            item.name.toLowerCase().includes(query) || item.telNo.toLowerCase().includes(query)
          );
      }
    });
  }, [availabilities, searchQuery, selectedFilter]);

  const tableData = useMemo(() => {
    return filteredAvailabilities.map((item: AvailabilityItem) => ({
      id: item.availabilitiesId,
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
      if ((event.target as HTMLElement).closest('input[type="checkbox"]')) return;

      const availabilityItem = availabilities.find(item => item.availabilitiesId === id);

      if (availabilityItem) {
        console.log('🔗 Navigating to edit page with data:', availabilityItem.name);
        navigate(`/availability/${id}`, {
          state: { availability: availabilityItem },
        });
      } else {
        console.error('❌ Availability item not found for ID:', id);
      }
    },
    [navigate, availabilities]
  );

  const handleAdd = () => {
    console.log('➕ Navigating to create new availability');
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

  if (isLoading) {
    return (
      <main className='flex-1 flex flex-col min-h-0' role='main'>
        <PageHeader
          icon={CalendarMonthIcon}
          title='Your availability'
          description='Manage your availability across locations and roles'
        />
        <div className='flex-1 flex items-center justify-center mt-16'>
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
        <div className='flex-1 flex items-center justify-center mt-16'>
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
  if (availabilities?.length === 0) {
    return (
      <main className='flex-1 flex flex-col min-h-0' role='main'>
        <PageHeader
          icon={CalendarMonthIcon}
          title='Your availability'
          description='Manage your availability across locations and roles'
        />
        <div className='flex-1 flex items-center justify-center mt-16'>
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
        <AvailabilityTableWrapper
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
