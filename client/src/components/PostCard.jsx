import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tags: {
    paddingLeft: "16px",
  },
  tag: {
    margin: ".2rem",
  },
  title: {
    color: "#fff",
  },
  description: {
    color: "#bbb",
    lineClamp: 3,
  },
  creator: {
    marginTop: "1rem !important",
    color: "#606060",
    fontSize: "12px !important",
  },
});

const PostCard = ({ title, description, img, name, tags }) => {
  const classes = useStyles();
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div>
      <Card
        sx={{
          minWidth: 300,
          maxWidth: 350,
          padding: 2,
          backgroundColor: "#00073a",
          boxShadow: "2px 5px 8px #060505cc",
        }}
      >
        <CardMedia component="img" alt={title} height="200" image={img} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={classes.title}
          >
            {title}
          </Typography>
          <div>
            <Typography variant="body2" className={classes.description}>
              {description}
            </Typography>
          </div>
          <Typography variant="body2" className={classes.creator}>
            by {name}
          </Typography>
        </CardContent>
        <div className={classes.tags}>
          {tags.map((tag) => (
            <Chip
              label={tag}
              color="success"
              variant="outlined"
              className={classes.tag}
            />
          ))}
        </div>
        <CardActions>
          <Button size="small" onClick={handleLike}>
            {liked ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </Button>
          <Button size="small" style={{ textTransform: "none" }}>
            Details
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default PostCard;
