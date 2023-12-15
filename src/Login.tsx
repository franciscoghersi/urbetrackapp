import { useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { AppContext, AppContextProps } from "./context/AppContext";
import React from 'react';

const useStyles = makeStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '100px'
    },
    form: {
      width: '300px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    grid: {
      color: 'red'
    },
  });

function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  const { addUser } = React.useContext(
    AppContext
  ) as AppContextProps;

  const isValidUsername = /^[a-z]+$/.test(username);

  const isValidPassword = () => {
    var numbers = password.slice(0,3);
    var passusername = password.slice(3, password.length);
    var validUserName = username.slice(0,1).toUpperCase() + username.slice(1,username.length);
    return numbers === "123" && passusername === validUserName;
  };

  const handleLogin = () => {
    if (isValidUsername && isValidPassword()) { 
      setFailed(false);
      addUser(username);
      navigate("/home");
    } else {
      setFailed(true);
    }
  };

  return (
    <Container className={classes.container}>
      <form className={classes.form}>
      <Typography variant="h4">Iniciar sesión</Typography>
        <TextField
          label="Usuario"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
        {failed && <Grid className={classes.grid}>Usuario o contraseña equivocada</Grid>} 
      </form>
    </Container>
  );
}

export default Login;
