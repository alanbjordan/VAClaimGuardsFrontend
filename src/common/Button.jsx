import React from 'react';
import { CircularProgress, Button as MUIButton } from '@mui/material';

export default function Button({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  icon,
  ...props 
}) {
  // Map custom variant to MUI variant/color
  const color = variant === 'secondary' ? 'inherit' : 'primary';
  const buttonVariant = 'contained'; // You can customize to outlined if needed

  return (
    <MUIButton
      {...props}
      variant={buttonVariant}
      color={color}
      disabled={isLoading || props.disabled}
      startIcon={!isLoading && icon ? icon : undefined}
      endIcon={undefined} // end icon unused
      sx={{
        textTransform: 'none',
        fontWeight: '500',
      }}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : children}
    </MUIButton>
  );
}
