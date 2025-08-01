import React, { useState } from 'react';
import { useTheme } from '../theme/ThemeContext';
import DashboardHeader from '../components/messages/DashboardHeader';
import FilterDropdown from '../components/common/FilterDropdown';
import SearchInput from '../components/messages/SearchInput';
import ActionsDropdown from '../components/common/ActionsDropdown';
import MessageTable from '../components/messages/MessageTable';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import ForwardIcon from '@mui/icons-material/Forward';

interface Message {
  id: number;
  from: string;
  subject: string;
  company: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  isRead: boolean;
  hasAttachment: boolean;
  content: string;
}

const MessageDashboard: React.FC = () => {
  const { isDark } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Everything (inc. msg)');
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [expandedMessage, setExpandedMessage] = useState<number | null>(null);
  const [selectAll, setSelectAll] = useState(false);

  const filterOptions = ['Everything (inc. msg)', 'Company name', 'From', 'Subject'];

  const messages: Message[] = [
    {
      id: 1,
      from: 'Alldaypa',
      subject: 'alldayPA: New Account Details',
      company: 'alldayPA',
      date: '2025-07-09 20:43:03',
      priority: 'high',
      isRead: false,
      hasAttachment: true,
      content: `!! AWAITING REVISED COPY !!

Dear John,

Welcome to alldayPA, and congratulations on registering your new account.

You can download the welcome pack at https://www.alldaypa.co.uk/alldayPA-Welcome.pdf

We are proud to inform you that you have joined the call answering market leader since 1999, and we pride ourselves on offering the best front line support for businesses - regardless of your business size.

In order for you to get started we have included our Welcome Pack which will explain how to get the most out of our service. Please see attached document.

For your reference, here is your alldayPA account information:

Virtual office name: adpcx_dev
Virtual office url: https://virtualoffice.alldaypa.com/login?company=adpcx_dev

The attached document will explain in full what to do with your account information.

Kind regards,

Gareth Jeffery
Head of Customer Service`,
    },
    {
      id: 2,
      from: 'Support Team',
      subject: 'Your support ticket has been resolved',
      company: 'TechCorp',
      date: '2025-07-08 14:22:15',
      priority: 'medium',
      isRead: true,
      hasAttachment: false,
      content: 'Your support request has been successfully resolved. Thank you for your patience.',
    },
    {
      id: 3,
      from: 'Billing Department',
      subject: 'Monthly Invoice Available',
      company: 'ServicePro',
      date: '2025-07-07 09:15:30',
      priority: 'low',
      isRead: true,
      hasAttachment: true,
      content: 'Your monthly invoice is now available for download from your account dashboard.',
    },
  ];

  const handleSelectMessage = (messageId: number) => {
    setSelectedMessages(prev => {
      const newSelection = prev.includes(messageId)
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId];
      setSelectAll(newSelection.length === messages.length);
      return newSelection;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSelectedMessages(checked ? messages.map(msg => msg.id) : []);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleExpandMessage = (messageId: number | null) => {
    setExpandedMessage(messageId);
  };

  return (
    <main className='flex-1 flex flex-col min-h-0' role='main' aria-label='Message Dashboard'>
      <DashboardHeader isDark={isDark} />

      {/* Controls Section */}
      <section
        className={`flex-shrink-0 p-3 border-b transition-colors ${
          isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/80'
        } backdrop-blur-sm`}
        aria-label='Message controls'
      >
        <div className='flex flex-col lg:flex-row gap-4'>
          <FilterDropdown
            selected={selectedFilter}
            options={filterOptions}
            isDark={isDark}
            onChange={handleFilterChange}
          />

          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={`Search messages by ${selectedFilter.toLowerCase()}`}
            isDark={isDark}
          />

          <ActionsDropdown
            isDark={isDark}
            items={[
              {
                icon: VisibilityIcon,
                label: 'Mark as read',
                action: () => console.log('Mark as read'),
              },
              {
                icon: VisibilityOffIcon,
                label: 'Mark as unread',
                action: () => console.log('Mark as unread'),
              },
              {
                icon: ForwardIcon,
                label: 'Forward',
                action: () => console.log('Forward'),
              },
              {
                icon: ArchiveIcon,
                label: 'Archive',
                action: () => console.log('Archive'),
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

      {/* Message Table Section */}
      <section className='flex-1 p-6 overflow-auto' aria-label='Messages'>
        <MessageTable
          messages={messages}
          selectedMessages={selectedMessages}
          expandedMessage={expandedMessage}
          selectAll={selectAll}
          onSelectMessage={handleSelectMessage}
          onSelectAll={handleSelectAll}
          onExpandMessage={handleExpandMessage}
          isDark={isDark}
        />
      </section>
    </main>
  );
};

export default MessageDashboard;
