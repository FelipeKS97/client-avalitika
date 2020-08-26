import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AuthContext } from "./AuthProvider";
import { useHistory } from "react-router-dom";

const fixed_logins = [
  {
    username: "teste",
    password: "123",
  },
  {
    username: "teste@teste.com",
    password: "12",
  }
];

export default function LoginDialog({ openModalLogin, setOpenModalLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useHistory();
  const [user, setUser] = useContext(AuthContext);

  const handleLogin = () => {
    // As here is just an example, we have some fixed credentials.
    const hasLogin = fixed_logins.some(
      (fixed) => fixed.username === username && fixed.password === password
    );

    if (hasLogin) {
      setUser(true)
      setOpenModalLogin(false)
      push('/dashboard')
    }
  };

  return (
    <>
      <Dialog open={openModalLogin} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Verificação</DialogTitle>
        <DialogContent>
          <DialogContentText>Realize seu login abaixo.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            variant={"outlined"}
            id="login-dialog"
            size={"medium"}
            label="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />

          <TextField
            margin="dense"
            variant={"outlined"}
            id="login-dialog"
            size={"medium"}
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModalLogin(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleLogin} variant="contained" color="primary">
            Entrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
