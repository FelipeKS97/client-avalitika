import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { axiosInstance as axios } from '../../../config/axios';


export default function AlertPublish({ id, status, published_until }) {
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState(false);
  const { put } = axios

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePublish = async () => {
    try {
      const request = await put(`/coord/formulary/${id}/publish`)
      handleClose()
      setNewStatus(true)
      setUpdatedStatus(request.data.status)
    } catch (error) {
      console.log(error)
      handleClose()
    }
  }

  const handleUnpublish = async () => {
    try {
      const request = await put(`/coord/formulary/${id}/unpublish`)
      handleClose()
      setNewStatus(true)
      setUpdatedStatus(request.data.status)
      
    } catch (error) {
      console.log(error)
      handleClose()
    }
  }

  let newUpdatedStatus = newStatus ?  updatedStatus : status

  return (
    <>
    { newUpdatedStatus ?
      <Button color="primary" variant="outlined" size="small" onClick={handleUnpublish}>
        Encerrar Publicação
      </Button>
      :
      <>
      <Button color="primary" variant="contained" size="small" onClick={handleClickOpen}>
        Publicar
      </Button>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Publicar o formulário?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja publicar o formulário? Lembrando que após a publicação, o formato e 
            os dados relativos ao formulário não poderão mais ser alterados.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handlePublish} color="primary" autoFocus>
            Publicar
          </Button>
        </DialogActions>
      </Dialog>
      </>
    }
    </>
  );
}