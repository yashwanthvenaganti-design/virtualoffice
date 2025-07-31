import React from 'react';
import {
  Portal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isDark?: boolean;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description = 'This action cannot be undone. Do you really want to delete this item?',
  isDark = false,
}) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby='confirm-delete-title'
        aria-describedby='confirm-delete-description'
        PaperProps={{
          sx: {
            borderRadius: 4,
            backgroundColor: isDark ? '#1f2937' : 'white',
            color: isDark ? '#d1d5db' : 'inherit',
          },
        }}
      >
        <DialogTitle
          id='confirm-delete-title'
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <DeleteOutlineIcon color='error' />
          {title}
        </DialogTitle>

        <DialogContent>
          <Typography id='confirm-delete-description' variant='body2'>
            {description}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={onClose}
            variant='outlined'
            sx={{ borderRadius: '6px', color: isDark ? '#d1d5db' : 'inherit' }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant='contained'
            color='error'
            sx={{ borderRadius: '6px', color: 'white' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmDeleteModal;
