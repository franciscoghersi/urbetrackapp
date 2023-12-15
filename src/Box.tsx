import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import Image from "./Entities/Image";
import { makeStyles } from "@mui/styles";
import { AppContext, AppContextProps } from "./context/AppContext";

interface Props {
  image: Image;
}

const useStyles = makeStyles({
  card: {
    width: "100%",
    height: "270px",
    margin: "5px",
    padding: "5px",
  },
});

const Box = ({ image }: Props) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const { toggleImage, images } = React.useContext(
    AppContext
  ) as AppContextProps;

  const handleFavoriteToggle = () => {
    toggleImage(image);
  };

  const handleImageOnClick = () => {
    navigate("/image/" + image.id);
  };

  const isFavorite = images.some((img) => img.id === image.id);

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        height="150px"
        image={image.image}
        alt={image.name}
        onClick={handleImageOnClick}
      />
      <CardContent>
        <Typography variant="h6">{image.name}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Genero : {image.gender}
        </Typography>
        <IconButton
          color={isFavorite ? "secondary" : "default"}
          onClick={handleFavoriteToggle}
        >
          <FavoriteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default Box;
