import React, { useState }from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import VerfiedImage from '../../assets/verifiedImage.svg'

export default function VerificationDialog({
  openDialog,
  setOpenDialog,
  setIsVerified,
  isVerified,
  verificationId,
  setVerificationId,
}) {

  const [value, setValue] = useState('')
  const handleVerification = () => {
    // Here, you do the async call/calls to verify the id.
    // As here is just an example we'll do this way:
    if(value.length > 0) {
      setVerificationId(value)
      setIsVerified(true)
    }
  }

  return (
    <>
        {!isVerified ? (
            <Dialog
                open={openDialog}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Verificação</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Para submeter respostas, precisamos verificar se você é um aluno. Não
                    se preocupe, pois os dados serão criptografados e não serão enviados
                    junto com sua resposta.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        variant={"outlined"}
                        id="verif_id"
                        size={"medium"}
                        label="Insira sua matrícula"
                        value={value}
                        onChange={ e => setValue(e.target.value) }
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleVerification} color="primary">
                        Verificar
                    </Button>
                </DialogActions>
            </Dialog> ) : (
            <Dialog
                open={openDialog}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Verificação</DialogTitle>
                <DialogContent style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <img style={{ padding: '30px' }} src={VerfiedImage} alt={"Verificado"} />
                    <DialogContentText>
                    Você foi verificado como aluno da instituição.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                    Fechar
                    </Button>
                </DialogActions>
            </Dialog>
            )

        }
    </>
  );
}
