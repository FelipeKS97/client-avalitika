import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AuthContext } from "./AuthProvider";
import { useHistory } from "react-router-dom";
import { axiosInstance as axios } from '../../../config/axios'


export default function LoginDialog({ openModalLogin, setOpenModalLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useHistory();
  const [user, setUser] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    // As here is just an example, we have simulated a simple login.
    const credentials = { email: username, password }/*  */
    setIsLoading(true)
    try {
        const login = await axios.post('/auth/login', credentials)
        if(login.data.data.token.length > 0) {
          setError(false);
          setUser(true);
          localStorage.setItem("auth_token", login.data.token);
          setOpenModalLogin(false);
          push("/dashboard");
        } else {
          setError(true)
        }
    } catch (error) {
        // setIsError(true);
        console.log(error)
        setError(true)
    }
    finally {
        setIsLoading(false);
    }

  };

  const handleCancel = () => {
    if(error) {
      setError(false)
    }
    setUsername("")
    setPassword("")
    setOpenModalLogin(false)
  }

  return (
    <>
      <Dialog open={openModalLogin} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Entrar</DialogTitle>
        <DialogContent>
          <DialogContentText>Realize seu login abaixo.</DialogContentText>
          <TextField
            autoFocus
            error={error}
            helperText={error && "Credenciais incorretas."}
            margin="dense"
            variant={"outlined"}
            id="login-dialog-username"
            size={"medium"}
            label="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            fullWidth
          />

          <TextField
            error={error}
            helperText={error && "Credenciais incorretas."}
            margin="dense"
            variant={"outlined"}
            id="login-dialog-password"
            size={"medium"}
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={isLoading} onClick={() => handleCancel()} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleLogin()}
            variant="contained"
            type="submit"
            color="primary"
          >
             { isLoading ? <CircularProgress color="inherit" /> : 'Entrar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
