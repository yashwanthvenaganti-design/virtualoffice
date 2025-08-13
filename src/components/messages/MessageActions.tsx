import React, { useState } from 'react';
import VIPFormModal from '../VIPform/VIPFormModal';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ConfirmationModal from '../../utils/ConfirmationModal';

interface MessageActionsProps {
  messageId: number;
  messageFrom?: string;
  messageCompany?: string;
  onActionClick?: () => void;
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
  messageId,
  messageFrom = '',
  messageCompany = '',
  onActionClick,
}) => {
  const [isVIPModalOpen, setIsVIPModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleCreateVIP = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setIsVIPModalOpen(true);
    onActionClick?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setIsDeleteConfirmOpen(true);
    onActionClick?.();
  };

  const handleConfirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Delete message ${messageId}`);
    setIsDeleteConfirmOpen(false);
    // Add your actual delete logic here
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteConfirmOpen(false);
  };

  const handleVIPSubmit = (values: VIPFormData) => {
    console.log('VIP form submitted:', values);
    // Add your VIP creation logic here
  };

  const handleCloseVIPModal = () => {
    setIsVIPModalOpen(false);
  };

  const getInitialVIPData = () => {
    const nameParts = messageFrom.split(' ');
    return {
      forename: nameParts[0] || '',
      surname: nameParts.slice(1).join(' ') || '',
      companyName: messageCompany || '',
    };
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className='flex justify-end gap-3 mb-4'
        role='toolbar'
        aria-label='Message actions'
        onClick={handleContainerClick}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreateVIP}
          className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-[14px] font-medium transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/50'
          aria-label='Create new VIP contact from this message'
          type='button'
        >
          <PersonAddIcon fontSize='small' /> Create new VIP
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
          className='flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-[14px] font-medium transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500/50'
          aria-label='Delete this message'
          type='button'
        >
          <DeleteIcon fontSize='small' /> Delete
        </motion.button>
      </div>

      <VIPFormModal
        isOpen={isVIPModalOpen}
        onClose={handleCloseVIPModal}
        onSubmit={handleVIPSubmit}
        initialData={getInitialVIPData()}
      />

      <ConfirmationModal
        isOpen={isDeleteConfirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title='Confirm Deletion'
        message='Are you sure you want to delete this message? This action cannot be undone.'
        confirmText='Delete'
        cancelText='Cancel'
        confirmButtonClass='bg-red-600 hover:bg-red-700 text-white focus:ring-red-500/50'
      />
    </>
  );
};

export default MessageActions;
