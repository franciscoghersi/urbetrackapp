import React from 'react';
import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LeftNav from './LeftNav';
import { AppContext, AppContextProps } from "./context/AppContext";
import Box from './Box';

const useStyles = makeStyles({
  container: {
    marginTop: '20px',
  },
  scroll:{
    display:'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '16px'

  }
});


function MyImages() {
  const classes = useStyles();
  
  const { images } = React.useContext(
    AppContext
  ) as AppContextProps;

  return (
    <Container className={classes.container}>
        <LeftNav/>
      <Typography variant="h4">Lista de Imágenes</Typography>
      <div className={classes.scroll}>
        { 
            images && images.map(image => (
            <Box image={image}/>
        ))
        }
      </div>
    </Container>
  );
}

export default MyImages;