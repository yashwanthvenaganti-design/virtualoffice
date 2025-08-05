import React, { useState } from 'react';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ActionItem {
  icon: React.ElementType;
  label: string;
  action: () => void;
  isDanger?: boolean;
}

interface ActionsDropdownProps {
  items: ActionItem[];
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({ items }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (action: () => void) => {
    action();
    handleClose();
  };

  const regularItems = items.filter(item => !item.isDanger);
  const dangerItems = items.filter(item => item.isDanger);

  return (
    <>
      <Button
        onClick={handleOpen}
        endIcon={<ExpandMoreIcon />}
        aria-haspopup='true'
        aria-expanded={open}
        variant='outlined'
        size='medium'
        disableRipple
        className='!min-w-[220px] !normal-case !justify-between !px-3 !py-2 !font-medium !text-[14px] !rounded-md !border-gray-300 dark:!border-gray-700 !bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-gray-100 hover:!bg-gray-100 dark:hover:!bg-gray-700 hover:!border-gray-400 dark:hover:!border-gray-500 !transition-colors !duration-200'
      >
        Actions
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            className:
              'mt-3 !min-w-[220px] !rounded-md !bg-white dark:!bg-gray-900 !border !border-gray-200 dark:!border-gray-700 !shadow-lg',
          },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {regularItems?.map(({ icon: Icon, label, action }) => (
          <MenuItem
            key={label}
            onClick={() => handleItemClick(action)}
            className='!text-[14px] !rounded-md !px-3 !py-3 !mx-1 !my-0.5 !text-gray-900 dark:!text-gray-100 hover:!bg-gray-100 dark:hover:!bg-gray-800 !transition-colors !duration-200'
          >
            <ListItemIcon className='!min-w-[30px]'>
              <Icon fontSize='small' className='!text-gray-600 dark:!text-gray-400' />
            </ListItemIcon>
            <ListItemText className='!text-gray-900 dark:!text-gray-100'>{label}</ListItemText>
          </MenuItem>
        ))}

        {dangerItems?.length > 0 && regularItems?.length > 0 && (
          <div className='h-px bg-gray-200 dark:bg-gray-700 mx-2 my-1' />
        )}

        {dangerItems?.map(({ icon: Icon, label, action }) => (
          <MenuItem
            key={label}
            onClick={() => handleItemClick(action)}
            className='!text-[14px] !rounded-md !px-3 !py-3 !mx-1 !my-0.5 !text-red-600 dark:!text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/10 !transition-colors !duration-200'
          >
            <ListItemIcon className='!min-w-[30px]'>
              <Icon fontSize='small' className='!text-red-600 dark:!text-red-400' />
            </ListItemIcon>
            <ListItemText className='!text-red-600 dark:!text-red-400'>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ActionsDropdown;
