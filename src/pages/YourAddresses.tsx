import React, { useCallback, useState, useMemo, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import FilterDropdown from '../components/common/FilterDropdown';
import ActionsDropdown from '../components/common/ActionsDropdown';
import SearchInput from '../components/messages/SearchInput';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Add } from '@mui/icons-material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import AddressTable from '../components/addresses/AddressesTable';
import ErrorBoundary from '../utils/ErrorBoundary';
import toast from 'react-hot-toast';
import ConfirmationModal from '../utils/ConfirmationModal';

import { useAddresses, useDeleteAddresses } from '../hooks/useAddress';
import type { AddressItem, AddressRowData } from '../types/address';

const COMPANIES_ID = import.meta.env.VITE_APP_COMPANIES_ID;
const EmptyArr: AddressItem[] = [];

const YourAddresses: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Name');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const {
    data: addressesResponse,
    isLoading,
    error,
    refetch,
  } = useAddresses(
    { companiesId: COMPANIES_ID },
    {
      onError: error => {
        console.error('Failed to fetch addresses:', error);
        toast.error('Failed to load addresses');
      },
    }
  );

  useEffect(() => {
    const state = location.state as any;

    if (state?.refreshData) {
      // Method 1: Refetch data from server (ensures fresh data)
      refetch();

      // Show success message if provided
      if (state.message) {
        toast.success(state.message);
      }

      navigate(location.pathname, { replace: true, state: undefined });
    }
  }, [location.state, refetch, navigate, location.pathname]);

  // Delete mutation
  const deleteMutation = useDeleteAddresses({
    onSuccess: data => {
      console.log('✅ Successfully deleted addresses:', data);
      setSelectedRows([]);
      setSelectAll(false);
      toast.success(`Successfully deleted ${selectedRows.length} item(s)`);
    },
    onError: error => {
      console.error('❌ Failed to delete addresses:', error);
      toast.error('Failed to delete selected items');
    },
  });

  const filterOptions = ['Name', 'Address', 'Postcode', 'Landmark'];

  const addresses = addressesResponse?.data || EmptyArr;

  const filteredAddresses = useMemo(() => {
    if (!addresses.length) return [];

    return addresses.filter((item: AddressItem) => {
      if (!searchQuery || searchQuery.trim() === '') return true;

      const query = searchQuery.toLowerCase().trim();

      switch (selectedFilter) {
        case 'Name':
          return item.name?.toLowerCase().includes(query) || false;
        case 'Address':
          return (
            item.addrLine1?.toLowerCase().includes(query) ||
            item.addrLine2?.toLowerCase().includes(query) ||
            item.addrLine3?.toLowerCase().includes(query) ||
            item.town?.toLowerCase().includes(query) ||
            false
          );
        case 'Postcode':
          return item.postcode?.toLowerCase().includes(query) || false;
        case 'Landmark':
          return item.landmark?.toLowerCase().includes(query) || false;
        default:
          return (
            item.name?.toLowerCase().includes(query) ||
            item.addrLine1?.toLowerCase().includes(query) ||
            item.postcode?.toLowerCase().includes(query) ||
            item.landmark?.toLowerCase().includes(query) ||
            false
          );
      }
    });
  }, [addresses, searchQuery, selectedFilter]);

  const tableData: AddressRowData[] = useMemo(() => {
    return filteredAddresses.map((item: AddressItem) => ({
      id: item.addressesId,
      name: item.name,
      isDefault: item.isDefault || false, // You might want to add logic to determine default
      landmark: item.landmark || '',
      companyTelNo: `${item.telPrefix || ''} ${item.telNo || ''}`.trim(),
      addrLine1: item.addrLine1,
      postcode: item.postcode,
    }));
  }, [filteredAddresses]);

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

      const addressItem = addresses.find(item => item.addressesId === id);

      if (addressItem) {
        navigate(`/addresses/${id}`, {
          state: { address: addressItem },
        });
      } else {
        console.error('❌ Address item not found for ID:', id);
        toast.error('Item not found');
      }
    },
    [navigate, addresses]
  );

  const handleEditAddress = useCallback(
    (id: string) => {
      const addressItem = addresses.find(item => item.addressesId === id);
      if (addressItem) {
        navigate(`/addresses/${id}/edit`, {
          state: { address: addressItem },
        });
      } else {
        console.error('❌ Address item not found for ID:', id);
        toast.error('Item not found');
      }
    },
    [navigate, addresses]
  );

  const handleAddAddress = () => {
    console.log('➕ Navigating to create new address');
    navigate('/addresses/new');
  };

  const handleDeleteAddresses = () => {
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

  const handleSetAsDefault = () => {
    if (selectedRows.length === 1) {
      console.log('Setting address as default:', selectedRows[0]);
      // TODO: Implement set default logic when API is available
      toast.info('Set as default functionality coming soon');
    } else {
      toast.error('Please select exactly one address to set as default');
    }
  };

  const handleSetPriority = (priority: 'high' | 'default' | 'low') => {
    if (selectedRows.length === 0) {
      toast.error('Please select addresses to change priority');
      return;
    }
    console.log(`Setting priority to ${priority} for:`, selectedRows);
    // TODO: Implement priority logic when API is available
    toast.info(`Priority functionality coming soon`);
  };

  const handleRetry = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <main className='flex-1 flex flex-col min-h-0' role='main'>
        <PageHeader
          icon={LocationOnIcon}
          title='Your address list'
          description='Manage your address list across locations and roles'
          infoMessage='The order the addresses appear here, is the same order that your PA sees.'
        />
        <div className='flex-1 flex items-center justify-center min-h-0 mt-20'>
          <div className='text-center space-y-4'>
            <CircularProgress size={48} />
            <div>
              <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                Loading addresses...
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Please wait while we fetch your address data.
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
          icon={LocationOnIcon}
          title='Your address list'
          description='Manage your address list across locations and roles'
          infoMessage='The order the addresses appear here, is the same order that your PA sees.'
        />
        <div className='flex-1 flex items-center justify-center min-h-0 mt-20'>
          <div className='text-center space-y-4'>
            <div>
              <h3 className='text-lg font-semibold text-red-600 dark:text-red-400'>
                Failed to Load Addresses
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-md'>
                {error.message || 'There was an error loading your address data.'}
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
                onClick={handleAddAddress}
                className='px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
              >
                Add New Address
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Empty state
  if (addresses?.length === 0) {
    return (
      <main className='flex-1 flex flex-col min-h-0' role='main'>
        <PageHeader
          icon={LocationOnIcon}
          title='Your address list'
          description='Manage your address list across locations and roles'
          infoMessage='The order the addresses appear here, is the same order that your PA sees.'
        />
        <div className='flex-1 flex items-center justify-center min-h-0 mt-20'>
          <div className='text-center space-y-4'>
            <LocationOnIcon className='w-16 h-16 text-gray-400 mx-auto' />
            <div>
              <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                No addresses found
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
                Get started by creating your first address.
              </p>
            </div>
            <button
              onClick={handleAddAddress}
              className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
            >
              <Add className='w-4 h-4 mr-2' />
              Add Address
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
        aria-label='Your Address List Dashboard'
      >
        <PageHeader
          icon={LocationOnIcon}
          title='Your address list'
          description='Manage your address list across locations and roles'
          infoMessage='The order the addresses appear here, is the same order that your PA sees.'
        />

        <section
          className='flex-shrink-0 p-3 border-b border-gray-200 bg-white/80 dark:border-gray-700 dark:bg-gray-800/50 backdrop-blur-sm'
          aria-label='Address controls'
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
              placeholder={`Search by ${selectedFilter.toLowerCase()}...`}
            />

            <ActionsDropdown
              items={[
                {
                  icon: Add,
                  label: 'Add Address',
                  action: handleAddAddress,
                },
                {
                  icon: DeleteIcon,
                  label: `Delete Selected (${selectedRows.length})`,
                  action: handleDeleteAddresses,
                  isDanger: true,
                  disabled: selectedRows.length === 0,
                },
                {
                  icon: PriorityHighIcon,
                  label: 'High Priority',
                  action: () => handleSetPriority('high'),
                  disabled: selectedRows.length === 0,
                },
                {
                  icon: DisabledByDefaultIcon,
                  label: 'Default Priority',
                  action: () => handleSetPriority('default'),
                  disabled: selectedRows.length === 0,
                },
                {
                  icon: LowPriorityIcon,
                  label: 'Low Priority',
                  action: () => handleSetPriority('low'),
                  disabled: selectedRows.length === 0,
                },
              ]}
            />
          </div>
        </section>

        <section className='flex-1 p-2 overflow-auto' aria-label='Address Table'>
          <AddressTable
            rows={tableData}
            selectedRows={selectedRows}
            onSelectRow={handleSelectRow}
            onSelectAll={handleSelectAll}
            selectAll={selectAll}
            onRowClick={handleRowClick}
            onEditAddress={handleEditAddress}
          />
        </section>

        <ConfirmationModal
          isOpen={isDeleteConfirmOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          title='Confirm Deletion'
          message={`Are you sure you want to delete ${selectedRows?.length} address(es)? This action cannot be undone.`}
          confirmText='Delete'
          cancelText='Cancel'
          confirmButtonClass='bg-red-600 hover:bg-red-700 text-white focus:ring-red-500/50'
        />
      </main>
    </ErrorBoundary>
  );
};

export default YourAddresses;
