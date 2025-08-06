import React, { useState } from 'react';
import VIPFormModal from '../VIPform/VIPFormModal';
import { Portal } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

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

      <AnimatePresence>
        {isDeleteConfirmOpen && (
          <Portal>
            <motion.div
              className='fixed inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={e => {
                if (e.target === e.currentTarget) {
                  handleCancelDelete(e);
                }
              }}
            >
              <motion.div
                className='bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full border border-gray-200 dark:border-gray-700'
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={e => e.stopPropagation()}
              >
                <div className='flex flex-col items-center text-center'>
                  <WarningAmberIcon
                    sx={{ fontSize: 64 }}
                    className='text-yellow-500 dark:text-yellow-400 mb-4'
                  />

                  <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                    Confirm Deletion
                  </h2>
                  <p className='text-[14px] text-gray-700 dark:text-gray-300 mb-6'>
                    Are you sure you want to delete this message? This action cannot be undone.
                  </p>
                </div>
                <div className='flex justify-end gap-3'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancelDelete}
                    className='px-4 py-2 rounded-md text-[14px] font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500/50'
                    type='button'
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleConfirmDelete}
                    className='px-4 py-2 rounded-md text-[14px] font-medium bg-red-600 hover:bg-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50'
                    type='button'
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};

export default MessageActions;
