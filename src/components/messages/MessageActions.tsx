import React, { useState } from 'react';
import VIPFormModal from '../VIPform/VIPFormModal';

interface MessageActionsProps {
  isDark: boolean;
  messageId: number;
  messageFrom?: string;
  messageCompany?: string;
}

interface VIPFormData {
  title?: string;
  forename: string;
  surname: string;
  sex: 'female' | 'male' | 'unspecified';
  companyName: string;
  telNo: string;
  alternateTelNo?: string;
  emailAddress?: string;
}

const MessageActions: React.FC<MessageActionsProps> = ({
  isDark,
  messageId,
  messageFrom = '',
  messageCompany = '',
}) => {
  const [isVIPModalOpen, setIsVIPModalOpen] = useState(false);

  const handleCreateVIP = () => {
    setIsVIPModalOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      console.log(`Delete message ${messageId}`);
      // Add your delete logic here
    }
  };

  const handleVIPSubmit = (values: VIPFormData) => {
    console.log('VIP form submitted:', values);
    // Add your VIP creation logic here
    // This could be an API call to save the VIP contact
  };

  const handleCloseVIPModal = () => {
    setIsVIPModalOpen(false);
  };

  // Pre-populate form with message data if available
  const getInitialVIPData = () => {
    const nameParts = messageFrom.split(' ');
    return {
      forename: nameParts[0] || '',
      surname: nameParts.slice(1).join(' ') || '',
      companyName: messageCompany || '',
    };
  };

  return (
    <>
      <div className='flex justify-end gap-3 mb-4' role='toolbar' aria-label='Message actions'>
        <button
          onClick={handleCreateVIP}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm hover:shadow-md focus:outline-none'
          aria-label='Create new VIP contact from this message'
        >
          Create new VIP
        </button>

        <button
          onClick={handleDelete}
          className='bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm hover:shadow-md focus:outline-none'
          aria-label='Delete this message'
        >
          Delete
        </button>
      </div>

      <VIPFormModal
        isOpen={isVIPModalOpen}
        onClose={handleCloseVIPModal}
        onSubmit={handleVIPSubmit}
        initialData={getInitialVIPData()}
      />
    </>
  );
};

export default MessageActions;
