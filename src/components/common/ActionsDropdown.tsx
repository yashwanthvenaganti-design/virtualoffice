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
  isDark: boolean;
  items: ActionItem[];
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({ isDark, items }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
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
        sx={{
          minWidth: '220px',
          textTransform: 'none',
          justifyContent: 'space-between',
          px: 2,
          py: 0.5,
          fontWeight: 500,
          fontSize: '0.875rem',
          borderRadius: '6px',
          borderColor: isDark ? 'grey.700' : 'grey.300',
          backgroundColor: isDark ? 'grey.800' : 'white',
          color: isDark ? 'grey.100' : 'grey.900',
          '&:hover': {
            backgroundColor: isDark ? 'grey.700' : 'grey.100',
            borderColor: isDark ? 'grey.500' : 'grey.400',
          },
        }}
      >
        Actions
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 6,
          sx: {
            mt: 1.2,
            minWidth: '220px',
            borderRadius: '6px',
            backgroundColor: isDark ? 'grey.900' : 'white',
            border: `1px solid ${isDark ? theme.palette.grey[700] : theme.palette.grey[200]}`,
            color: isDark ? 'grey.100' : 'grey.900',
            boxShadow: theme.shadows[4],
          },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {regularItems.map(({ icon: Icon, label, action }) => (
          <MenuItem
            key={label}
            onClick={() => handleItemClick(action)}
            sx={{
              fontSize: '0.875rem',
              borderRadius: '6px',
              px: 2,
              py: 1.2,
              '&:hover': {
                backgroundColor: isDark ? 'grey.800' : 'grey.100',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <Icon fontSize='small' />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}

        {dangerItems.map(({ icon: Icon, label, action }) => (
          <MenuItem
            key={label}
            onClick={() => handleItemClick(action)}
            sx={{
              fontSize: '0.875rem',
              borderRadius: '6px',
              color: 'error.main',
              px: 2,
              py: 1.2,
              '&:hover': {
                backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.07)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <Icon fontSize='small' sx={{ color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ActionsDropdown;
