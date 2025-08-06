import React, { useCallback, useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import FilterDropdown from '../components/common/FilterDropdown';
import ActionsDropdown from '../components/common/ActionsDropdown';
import AvailabilityTable from '../components/availability/AvailabilityTable';
import SearchInput from '../components/messages/SearchInput';
import { useNavigate } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Add } from '@mui/icons-material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import AddressTable from '../components/addresses/AddressesTable';

const YourAddresses: React.FC = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Name');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const filterOptions = ['Name'];

  const addresses: AddressRowData[] = [
    {
      id: 1,
      name: 'Primary address',
      isDefault: true,
      landmark: 'test',
      companyTelNo: 'adpcx_dev',
      addrLine1: '123 Main Street',
      postcode: 'AB12CD',
    },
    {
      id: 2,
      name: 'Office address',
      isDefault: false,
      landmark: 'Near Central Park',
      companyTelNo: 'adpcx_main',
      addrLine1: '456 Business Ave',
      postcode: 'EF34GH',
    },
    {
      id: 3,
      name: 'Warehouse',
      isDefault: false,
      landmark: 'Industrial Estate',
      companyTelNo: 'adpcx_warehouse',
      addrLine1: '789 Industrial Road',
      postcode: 'IJ56KL',
    },
  ];

  // Filter addresses based on search query
  const filteredAddresses = addresses.filter(address => {
    if (!searchQuery) return true;

    const searchLower = searchQuery.toLowerCase();
    return (
      address.name.toLowerCase().includes(searchLower) ||
      address.addrLine1.toLowerCase().includes(searchLower) ||
      address.postcode.toLowerCase().includes(searchLower) ||
      address.landmark.toLowerCase().includes(searchLower)
    );
  });

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev => {
      const updated = prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id];
      setSelectAll(updated.length === filteredAddresses.length);
      return updated;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSelectedRows(checked ? filteredAddresses.map(row => row.id) : []);
  };

  const handleRowClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, id: number) => {
      // Prevent click from selecting checkbox when user clicks the checkbox
      if ((event.target as HTMLElement).closest('input[type="checkbox"]')) return;
      navigate(`/addresses/${id}`);
    },
    [navigate]
  );

  const handleEditAddress = useCallback(
    (id: number) => {
      navigate(`/addresses/${id}/edit`);
    },
    [navigate]
  );

  const handleAddAddress = () => {
    navigate('/addresses/new');
  };

  const handleDeleteAddresses = () => {
    if (selectedRows.length > 0) {
      console.log('Deleting addresses:', selectedRows);
      // Implement delete logic here
      setSelectedRows([]);
      setSelectAll(false);
    }
  };

  const handleSetAsDefault = () => {
    if (selectedRows.length === 1) {
      console.log('Setting address as default:', selectedRows[0]);
      // Implement set default logic here
    }
  };

  return (
    <main
      className='flex-1 flex flex-col min-h-0'
      role='main'
      aria-label='Your Availability Dashboard'
    >
      <PageHeader
        icon={LocationOnIcon}
        title='Your address list'
        description='Manage your address list across locations and roles'
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
            placeholder={`Search by name...`}
          />

          <ActionsDropdown
            items={[
              {
                icon: Add,
                label: 'Add',
                action: () => console.log('Add'),
              },
              {
                icon: DeleteIcon,
                label: 'Delete',
                action: () => console.log('Delete'),
                isDanger: true,
              },
              {
                icon: PriorityHighIcon,
                label: 'High priority',
                action: () => console.log('Enabled'),
              },
              {
                icon: DisabledByDefaultIcon,
                label: 'Default priority',
                action: () => console.log('Disabled'),
              },
              {
                icon: LowPriorityIcon,
                label: 'Low priority',
                action: () => console.log('Disabled'),
              },
            ]}
          />
        </div>
      </section>

      <section className='flex-1 p-2 overflow-auto' aria-label='Address Table'>
        <AddressTable
          rows={filteredAddresses}
          selectedRows={selectedRows}
          onSelectRow={handleSelectRow}
          onSelectAll={handleSelectAll}
          selectAll={selectAll}
          onRowClick={handleRowClick}
          onEditAddress={handleEditAddress}
        />
      </section>
    </main>
  );
};

export default YourAddresses;
