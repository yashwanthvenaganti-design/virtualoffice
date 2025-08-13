import React from 'react';
import { Portal } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  icon?: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed? This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonClass = 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500/50',
  icon,
}) => {
  const defaultIcon = (
    <WarningAmberIcon sx={{ fontSize: 64 }} className='text-yellow-500 dark:text-yellow-400 mb-4' />
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          <motion.div
            className='fixed inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => {
              if (e.target === e.currentTarget) {
                onCancel(e);
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
                {icon || defaultIcon}

                <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                  {title}
                </h2>
                <p className='text-[14px] text-gray-700 dark:text-gray-300 mb-6'>{message}</p>
              </div>

              <div className='flex justify-end gap-3'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onCancel}
                  className='px-4 py-2 rounded-md text-[14px] font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500/50'
                  type='button'
                >
                  {cancelText}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onConfirm}
                  className={`px-4 py-2 rounded-md text-[14px] font-medium focus:outline-none focus:ring-2 ${confirmButtonClass}`}
                  type='button'
                >
                  {confirmText}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
