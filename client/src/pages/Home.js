import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  CardContent,
  Card,
  CardMedia,
  CardActions,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import { getPosts } from "../redux/features/postSlice";

const useStyles = makeStyles({
  cardParent: {
    padding: "1rem",
  },
  CardContainer: {
    width: "60%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: "1rem auto",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
  progress: {
    color: "#fff !important",
  },
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

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, posts } = useSelector((state) => ({ ...state.post }));

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress className={classes.progress} />
      </div>
    );
  }
  return (
    <div>
      <div className={classes.CardContainer}>
        {posts.length === 0 ? (
          <p>No posts to show :(</p>
        ) : (
          posts.map((post) => (
            <div key={post._id}>
              <Card
                sx={{
                  minWidth: 300,
                  maxWidth: 350,
                  padding: 2,
                  backgroundColor: "#00073a",
                }}
              >
                <CardMedia
                  component="img"
                  alt={post.title}
                  height="200"
                  image={post.img}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className={classes.title}
                  >
                    {post.title}
                  </Typography>
                  <div>
                    <Typography
                      variant="body2"
                      nowrap
                      className={classes.description}
                    >
                      {post.description}
                    </Typography>
                  </div>
                  <Typography variant="body2" className={classes.creator}>
                    by {post.name}
                  </Typography>
                </CardContent>
                <div className={classes.tags}>
                  {post.tags.map((tag) => (
                    <Chip
                      label={tag}
                      color="success"
                      variant="outlined"
                      className={classes.tag}
                    />
                  ))}
                </div>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
