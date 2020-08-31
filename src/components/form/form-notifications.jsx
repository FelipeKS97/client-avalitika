import React, { useEffect } from 'react';
import useCustomSnackbar from '../../hooks/CustomSnackbar';

export default function FormNotifications({ notification }) {
  const [snackbar, setSnackbarStatus] = useCustomSnackbar()

  useEffect(() => {
    if(notification.length > 0) {
      setSnackbarStatus({
        open: true,
        message: notification
      })
    }
  }, [notification])


  return  (<div>{ snackbar }</div>)
}