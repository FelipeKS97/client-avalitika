import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";
import { axiosInstance as axios } from "../../../config/axios";

export default function AlertPublish({
  id,
  status,
  published_at,
  isLoading,
  setIsLoading,
  setSnackbarStatus,
}) {
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState(false);
  const { put } = axios;
  const { push } = useHistory();

  const handleClickOpen = () => {
    if (published_at && published_at.length > 0) {
      handlePublish();
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      const request = await put(`/coord/formulary/${id}/publish`);
      handleClose();
      setSnackbarStatus({
        open: true,
        message: "Formulário publicado com sucesso.",
      });
      setNewStatus(true);
      setUpdatedStatus(request.data.status);
    } catch (error) {
      handleClose();
      setSnackbarStatus({
        open: true,
        message: "Ocorreu um erro. Tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnpublish = async () => {
    setIsLoading(true);
    try {
      const request = await put(`/coord/formulary/${id}/unpublish`);
      handleClose();
      setSnackbarStatus({
        open: true,
        message: "Publicação encerrada com sucesso.",
      });
      setNewStatus(true);
      setUpdatedStatus(request.data.status);
    } catch (error) {
      handleClose();
      setSnackbarStatus({
        open: true,
        message: "Ocorreu um erro. Tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  let newUpdatedStatus = newStatus ? updatedStatus : status;

  const AnswerButton = () => (
    <Button
      disabled={isLoading}
      color="primary"
      variant="outlined"
      onClick={() => push(`/answers/${id}`)}
      size="small"
    >
      Respostas
    </Button>
  );

  return (
    <>
      {newUpdatedStatus ? (
        <>
          <Button
            color="primary"
            variant="outlined"
            size="small"
            disabled={isLoading}
            onClick={handleUnpublish}
          >
            Encerrar Publicação
          </Button>
        </>
      ) : (
        <>
          {published_at && <AnswerButton />}
          <Button
            color="primary"
            variant="contained"
            size="small"
            disabled={isLoading}
            onClick={handleClickOpen}
          >
            Publicar
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Publicar o formulário?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Deseja publicar o formulário? Lembrando que após a publicação, o
                formato e os dados relativos ao formulário não poderão mais ser
                alterados.
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
      )}
    </>
  );
}
