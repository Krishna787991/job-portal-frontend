import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function AlertComponent({severity,content,Error,setError,success,setSuccess}) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      setError(false)
      setSuccess(false)
    }, 5000); // Adjust the duration as needed (in milliseconds)
    
    // Clear the timer when the component unmounts or when open changes
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setError(false)
    setSuccess(false)
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      {open && (
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
         {content}
        </Alert>
      )}
    </div>
  );
}

export default AlertComponent;
