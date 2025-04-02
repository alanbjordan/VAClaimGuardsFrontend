// CollapsibleMenuItem.jsx
import React, { useState } from 'react';
import { List, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
// Import your custom MenuItem
import MenuItem from './MenuItem';

function CollapsibleMenuItem({ icon: Icon, label, isActive, children }) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <>
      {/* Reuse the same MenuItem styles */}
      <MenuItem
        icon={Icon}
        label={label}
        isActive={isActive}
        onClick={handleToggle}
        // Optionally override the right icon to show expand/chevron
        // or just place the chevron at the far right if you prefer
      >
        {open ? <ExpandLess /> : <ExpandMore />}
      </MenuItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
}

export default CollapsibleMenuItem;
