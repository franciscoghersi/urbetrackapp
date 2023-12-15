import React, { useState } from 'react';
import { Container, Typography, Drawer, List, ListItemText, Button, ListItemButton, Divider, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppContext, AppContextProps } from "./context/AppContext";

const drawerWidth = 240;

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
  },
  content: {
    marginLeft: drawerWidth,
    padding: '20px',
  },
  grid: {
    display: 'flex',
    alignItems:'row'
  },
});

function LeftNav() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const { user } = React.useContext(
    AppContext
  ) as AppContextProps;

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleLogout = () => {
    console.log('Sesión cerrada');
    navigate("/");
  };

  return (
    <Grid className={classes.grid}>
      {!openDrawer && <Button onClick={handleDrawerToggle}><ArrowForwardIcon/></Button>}
      <Container className={classes.container}>
        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={openDrawer}
        >
          <List>
          <ListItemButton onClick={handleDrawerToggle}>
          <ListItemText>
                <Grid className={classes.grid}>
                  <ArrowBackIcon/>
                  <Typography variant="h6">{user}</Typography>
                </Grid>
              </ListItemText>
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={() => navigate("/home")}>
              <ListItemText>
                <Typography>Inicio</Typography>
              </ListItemText>
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/myimages")}>
              <ListItemText>
                <Typography>Imagenes</Typography>
              </ListItemText>
            </ListItemButton>
            <ListItemButton onClick={handleLogout}>
              <ListItemText>
                Cerrar sesion
              </ListItemText>
            </ListItemButton>
          </List>
        </Drawer>
      </Container>
    </Grid>
  );
}

export default LeftNav;