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
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { likePost } from "../redux/features/postSlice";

const PostCard = ({ id, title, description, img, name, tags, likes }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.post.posts.find((post) => post._id === id)
  );
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id || user?.result?.googleId;
  // const [liked, setLiked] = useState(false);

  const userHasLiked = (userId) => {
    return likes.includes(userId);
  };

  const handleLike = () => {
    dispatch(likePost(post._id));
  };

  const excerpt = (str) => {
    if (str.length > 60) {
      str = str.slice(0, 60) + "...";
    }
    return str;
  };

  return (
    <div>
      <Card className={classes.postCard}>
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
              {excerpt(description)}{" "}
              <Link to={`/posts/${id}`} style={{ color: "#ab112c" }}>
                Read More
              </Link>
            </Typography>
          </div>
          <Typography variant="body2" className={classes.creator}>
            by {name}
          </Typography>
        </CardContent>
        <div className={classes.tags}>
          {tags.map((tag, index) => (
            <Link to={`/posts/tags/${tag}`} key={index}>
              <Chip
                label={tag}
                color="success"
                variant="outlined"
                className={classes.tag}
              />
            </Link>
          ))}
        </div>
        <CardActions style={{ marginTop: ".5rem" }}>
          <Button size="small" onClick={handleLike}>
            {userHasLiked(userId) ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
            <span className={classes.likeCount}>{likes.length}</span>
          </Button>
          <Link to={`/posts/${id}`}>
            <Button size="small" style={{ textTransform: "none" }}>
              Details
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default PostCard;

const useStyles = makeStyles({
  postCard: {
    width: "300px !important",
    padding: ".75rem !important",
    margin: "1rem !important",

    backgroundColor: "#00073a !important",
    boxShadow: "2px 5px 8px #060505cc !important",
    "& a": {
      textDecoration: "none",
      cursor: "pointer",
    },
    ["@media (max-width:600px)"]: {
      width: "260px !important",
      margin: "1rem 0 !important",
    },

    ["@media (min-width:600px)"]: {
      width: "280px !important",
    },
  },
  tags: {
    paddingLeft: "10px",
  },
  tag: {
    margin: ".2rem",
    "&:hover": {
      backgroundColor: "red",
      color: "#fff",
      cursor: "pointer",
    },
  },
  title: {
    color: "#fff",
  },
  description: {
    color: "#bbb",
  },
  creator: {
    marginTop: "1rem !important",
    color: "#606060",
    fontSize: "12px !important",
  },
  likeCount: {
    marginLeft: ".3rem",
    color: "#606060",
    fontSize: "12px !important",
  },
});
