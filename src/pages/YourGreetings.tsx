import React, { useCallback, useState, useMemo, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import FilterDropdown from '../components/common/FilterDropdown';
import ActionsDropdown from '../components/common/ActionsDropdown';
import SearchInput from '../components/messages/SearchInput';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import MessageIcon from '@mui/icons-material/Message';
import { Add } from '@mui/icons-material';
import GreetingsTable from '../components/greeting/GreetingsTable';
import ErrorBoundary from '../utils/ErrorBoundary';
import toast from 'react-hot-toast';
import ConfirmationModal from '../utils/ConfirmationModal';

import { useGreetings, useDeleteGreetings } from '../hooks/useGreeting';
import type { GreetingItem, GreetingRowData } from '../types/greeting';

const COMPANIES_ID = import.meta.env.VITE_APP_COMPANIES_ID;
const EmptyArr: GreetingItem[] = [];

const YourGreetings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Profile Name');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const {
    data: greetingsResponse,
    isLoading,
    error,
    refetch,
  } = useGreetings(
    { companiesId: COMPANIES_ID },
    {
      onError: error => {
        console.error('Failed to fetch greetings:', error);
        toast.error('Failed to load greetings');
      },
    }
  );

  useEffect(() => {
    const state = location.state as any;

    if (state?.refreshData) {
      refetch();

      if (state.message) {
        toast.success(state.message);
      }

      navigate(location.pathname, { replace: true, state: undefined });
    }
  }, [location.state, refetch, navigate, location.pathname]);

  // Delete mutation
  const deleteMutation = useDeleteGreetings({
    onSuccess: data => {
      console.log('✅ Successfully deleted greetings:', data);
      setSelectedRows([]);
      setSelectAll(false);
      toast.success(`Successfully deleted ${selectedRows.length} item(s)`);
    },
    onError: error => {
      console.error('❌ Failed to delete greetings:', error);
      toast.error('Failed to delete selected items');
    },
  });

  const filterOptions = ['Profile Name', 'Greeting'];

  const greetings = greetingsResponse?.data || EmptyArr;

  const filteredGreetings = useMemo(() => {
    if (!greetings.length) return [];

    return greetings.filter((item: GreetingItem) => {
      if (!searchQuery || searchQuery.trim() === '') return true;

      const query = searchQuery.toLowerCase().trim();

      switch (selectedFilter) {
        case 'Profile Name':
          return item.name?.toLowerCase().includes(query) || false;
        case 'Greeting':
          return item.greeting?.toLowerCase().includes(query) || false;
        default:
          return (
            item.name?.toLowerCase().includes(query) ||
            item.greeting?.toLowerCase().includes(query) ||
            false
          );
      }
    });
  }, [greetings, searchQuery, selectedFilter]);

  const tableData: GreetingRowData[] = useMemo(() => {
    return filteredGreetings.map((item: GreetingItem) => ({
      id: item.greetingsId,
      profileName: item.name,
      greeting: item.greeting,
      salutation: item.salutation,
      verified: item.verified,
      isActive: item.status === 'A', // 'A' = Active, others = Inactive
      isDefault: item.isDefault,
    }));
  }, [filteredGreetings]);

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

      const greetingItem = greetings.find(item => item.greetingsId === id);

      if (greetingItem) {
        navigate(`/greetings/${id}`, {
          state: { greeting: greetingItem },
        });
      } else {
        console.error('❌ Greeting item not found for ID:', id);
        toast.error('Item not found');
      }
    },
    [navigate, greetings]
  );

  const handleEditGreeting = useCallback(
    (id: string) => {
      const greetingItem = greetings.find(item => item.greetingsId === id);
      if (greetingItem) {
        navigate(`/greetings/${id}`, {
          state: { greeting: greetingItem },
        });
      } else {
        console.error('❌ Greeting item not found for ID:', id);
        toast.error('Item not found');
      }
    },
    [navigate, greetings]
  );

  const handleAddGreeting = () => {
    console.log('➕ Navigating to create new greeting');
    navigate('/greetings/new');
  };

  const handleDeleteGreetings = () => {
    if (selectedRows.length === 0) {
      toast.error('Please select items to delete');
      return;
    }
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteConfirmOpen(false);

    try {
      await deleteMutation.mutateAsync(selectedRows);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteConfirmOpen(false);
  };

  const handleRetry = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <main className='flex-1 flex flex-col min-h-0' role='main'>
        <PageHeader
          icon={MessageIcon}
          title='Greetings'
          description='Manage your greeting messages for different times of day'
          infoMessage='You do not have an active greeting. A default one will be used until you set one.'
        />
        <div className='flex-1 flex items-center justify-center min-h-0 mt-20'>
          <div className='text-center space-y-4'>
            <CircularProgress size={48} />
            <div>
              <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                Loading greetings...
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Please wait while we fetch your greeting data.
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
          icon={MessageIcon}
          title='Greetings'
          description='Manage your greeting messages for different times of day'
          infoMessage='You do not have an active greeting. A default one will be used until you set one.'
        />
        <div className='flex-1 flex items-center justify-center min-h-0 mt-20'>
          <div className='text-center space-y-4'>
            <div>
              <h3 className='text-lg font-semibold text-red-600 dark:text-red-400'>
                Failed to Load Greetings
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-md'>
                {error.message || 'There was an error loading your greeting data.'}
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
                onClick={handleAddGreeting}
                className='px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
              >
                Add New Greeting
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Empty state
  if (greetings?.length === 0) {
    return (
      <main className='flex-1 flex flex-col min-h-0' role='main'>
        <PageHeader
          icon={MessageIcon}
          title='Greetings'
          description='Manage your greeting messages for different times of day'
          infoMessage='You do not have an active greeting. A default one will be used until you set one.'
        />
        <div className='flex-1 flex items-center justify-center min-h-0 mt-20'>
          <div className='text-center space-y-4'>
            <MessageIcon className='w-16 h-16 text-gray-400 mx-auto' />
            <div>
              <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                No greetings found
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
                Get started by creating your first greeting message.
              </p>
            </div>
            <button
              onClick={handleAddGreeting}
              className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
            >
              <Add className='w-4 h-4 mr-2' />
              Add Greeting
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <ErrorBoundary>
      <main
        className='flex-1 flex flex-col min-h-0'
        role='main'
        aria-label='Your Greetings Dashboard'
      >
        <PageHeader
          icon={MessageIcon}
          title='Greetings'
          description='Manage your greeting messages for different times of day'
          infoMessage='You do not have an active greeting. A default one will be used until you set one.'
        />

        <section
          className='flex-shrink-0 p-3 border-b border-gray-200 bg-white/80 dark:border-gray-700 dark:bg-gray-800/50 backdrop-blur-sm'
          aria-label='Greeting controls'
        >
          <div className='flex flex-col lg:flex-row gap-4 w-full min-w-0 flex-1 max-w-full'>
            <FilterDropdown
              selected={selectedFilter}
              options={filterOptions}
              onChange={setSelectedFilter}
            />

            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`Search by ${selectedFilter.toLowerCase()}...`}
            />

            <ActionsDropdown
              items={[
                {
                  icon: Add,
                  label: 'Add Greeting',
                  action: handleAddGreeting,
                },
                {
                  icon: DeleteIcon,
                  label: `Delete Selected (${selectedRows.length})`,
                  action: handleDeleteGreetings,
                  isDanger: true,
                },
              ]}
            />
          </div>
        </section>

        <section className='flex-1 p-2 overflow-auto' aria-label='Greetings Table'>
          <GreetingsTable
            rows={tableData}
            selectedRows={selectedRows}
            onSelectRow={handleSelectRow}
            onSelectAll={handleSelectAll}
            selectAll={selectAll}
            onRowClick={handleRowClick}
            onEditGreeting={handleEditGreeting}
          />
        </section>

        <ConfirmationModal
          isOpen={isDeleteConfirmOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          title='Confirm Deletion'
          message={`Are you sure you want to delete ${selectedRows?.length} greeting(s)? This action cannot be undone.`}
          confirmText='Delete'
          cancelText='Cancel'
          confirmButtonClass='bg-red-600 hover:bg-red-700 text-white focus:ring-red-500/50'
        />
      </main>
    </ErrorBoundary>
  );
};

export default YourGreetings;
