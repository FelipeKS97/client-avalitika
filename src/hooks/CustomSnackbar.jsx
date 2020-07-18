import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function useSnackbar() {
    const [snackbarStatus, setSnackbarStatus] = useState({
        open: false, 
        message: '', 
        action: null,
        duration: 5000,
        vertical: 'bottom',
        horizontal: 'right',
        severity: null
    })
    const {open, message, action, duration, vertical, horizontal, severity} = snackbarStatus

    let anchorOrigin = { 
        vertical: vertical || 'bottom', 
        horizontal: horizontal || 'right'
    }

    const handleClose = () => setSnackbarStatus({ open: false })
    const handleAction = () => {
        action(true)
        handleClose()
    } 
    const snackbar = ( 
        <Snackbar
            anchorOrigin={anchorOrigin}
            open={open}
            onClose={handleClose}
            message={message || ''}
            key={anchorOrigin + message}
            autoHideDuration={duration || 5000}
            action={<>
                {!!action && 
                    <Button color="secondary" size="small" onClick={handleAction}>
                        Recarregar
                    </Button>
                }
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </>}
            // severity={severity}
        />
    )
    return [snackbar, setSnackbarStatus];
  }