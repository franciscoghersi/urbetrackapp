import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Container, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LeftNav from './LeftNav';
import { makeStyles } from '@mui/styles';
import { useParams } from "react-router-dom";
import Image from './Entities/Image'
import axios from 'axios';
import { AppContext, AppContextProps } from "./context/AppContext";

const Details = () => {
    
const useStyles = makeStyles({
    container: {
        marginTop: '20px',
    }
    });

  const [isFavorite, setIsFavorite] = useState(false);
  const classes = useStyles();
  const params = useParams();
  const [image, setImage] = useState<Image>();
  const [loading, setLoading] = useState(false);

  const { toggleImage, existImage, images } = React.useContext(
    AppContext
  ) as AppContextProps;

  React.useEffect( () => {
    fetchImage();
  },[]);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    toggleImage(image!);
  };

  const fetchImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${params.id}`);
      console.log(response);
      setImage(response.data);
      setIsFavorite(existImage(response.data.id));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = () => {
    var source = image!.image;
    const a = document.createElement('a');
    a.download = source;
    a.href= source;
    a.click();
  }

  return (
    <Container className={classes.container}>
        <LeftNav/>
        <Card>
        <CardContent>
            <IconButton color={isFavorite ? 'secondary' : 'default'} onClick={handleFavoriteToggle}>
            <FavoriteIcon />
            </IconButton>
        </CardContent>
          <img height="200" width="200" src={image?.image} alt={"title"} />
        <CardContent>
            <Typography variant="subtitle1" color="textSecondary">
            Nombre: {image?.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
            Genero: {image?.gender}
            </Typography>
            <Button onClick={handleDownloadImage}>Descargar</Button>
        </CardContent>
        </Card>
    </Container>
  );
};

export default Details;