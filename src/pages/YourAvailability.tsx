import React, { useCallback, useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import FilterDropdown from '../components/common/FilterDropdown';
import ActionsDropdown from '../components/common/ActionsDropdown';
import AvailabilityTable from '../components/availability/AvailabilityTable';
import Add from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchInput from '../components/messages/SearchInput';
import { useNavigate } from 'react-router-dom';

const YourAvailability: React.FC = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Status Name');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const filterOptions = ['Status Name', 'Tel No'];

  const staffAvailability = [
    {
      id: 1,
      name: 'John Smith',
      availability: '9:00 AM - 5:00 PM',
      tel: '01234 567890',
      email: 'john.smith@example.com',
      sms: 'Enabled',
    },
    {
      id: 2,
      name: 'Emily Johnson',
      availability: 'Unavailable',
      tel: '07890 123456',
      email: 'emily.j@example.com',
      sms: 'Disabled',
    },
    {
      id: 3,
      name: 'Michael Green',
      availability: '10:00 AM - 4:00 PM',
      tel: '07900 998877',
      email: 'michael.green@example.com',
      sms: 'Enabled',
    },
  ];

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev => {
      const updated = prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id];
      setSelectAll(updated.length === staffAvailability.length);
      return updated;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSelectedRows(checked ? staffAvailability.map(row => row.id) : []);
  };

  const handleRowClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, id: number) => {
      // Prevent click from selecting checkbox when user clicks the checkbox
      if ((event.target as HTMLElement).closest('input[type="checkbox"]')) return;
      navigate(`/availability/${id}`);
    },
    [navigate]
  );

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
                label: 'Add',
                action: () => console.log('Add'),
              },
              {
                icon: DeleteIcon,
                label: 'Delete',
                action: () => console.log('Delete'),
                isDanger: true,
              },
            ]}
          />
        </div>
      </section>

      <section className='flex-1 p-2 overflow-auto' aria-label='Availability Table'>
        <AvailabilityTable
          rows={staffAvailability}
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
