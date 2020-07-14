import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default function useSnackbar(duration, vertical, horizontal) {
    const [snackbarStatus, setSnackbarStatus] = useState({open: false, message: ''})
    const { open, message } = snackbarStatus
    vertical = vertical || 'bottom'
    horizontal = horizontal || 'right'
    // severity = severity || null
    console.log({duration})
    const snackbar = ( 
        <Snackbar
            anchorOrigin={{vertical, horizontal}}
            open={open}
            onClose={() => setSnackbarStatus({ open: false })}
            message={message}
            key={vertical + horizontal + message}
            autoHideDuration={duration || 5000}
            // severity={severity}
        />
    )
    return [snackbar, setSnackbarStatus];
  }