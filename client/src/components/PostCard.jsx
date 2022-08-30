import React, { useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Tooltip,
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
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id || user?.result?.googleId;
  // const [liked, setLiked] = useState(false);

  const userHasLiked = (userId) => {
    return likes.includes(userId);
  };

  const handleLike = () => {
    dispatch(likePost({ id }));
  };

  const excerpt = (str) => {
    if (str.length > 60) {
      str = str.slice(0, 60) + "...";
    }
    return str;
  };

  return (
    <div className={classes.cardParent}>
      <Card>
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
          <Tooltip
            title={
              !userId
                ? "Login to like this post"
                : likes.length === 1 && userHasLiked(userId)
                ? "You Like this post"
                : userHasLiked(userId)
                ? `You and ${likes.length - 1} user likes this post`
                : "Like post"
            }
          >
            <Button
              size="small"
              onClick={!userId ? null : handleLike}
              color="primary"
            >
              {userHasLiked(userId) ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
              <span className={classes.likeCount}>{likes.length}</span>
            </Button>
          </Tooltip>
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
  cardParent: {
    "& .MuiCard-root": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      width: "300px",
      padding: ".75rem",
      margin: "1rem",
      backgroundColor: "#00073a",
      boxShadow: "2px 5px 8px #060505cc",
      "& a": {
        textDecoration: "none",
        cursor: "pointer",
      },
      ["@media (max-width:600px)"]: {
        width: "260px",
        margin: "1rem 0",
      },

      ["@media (min-width:600px)"]: {
        width: "280px",
      },
    }
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
    fontSize: "1.1rem !important",
    fontFamily: "Poppins, sans-serif !important",
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
