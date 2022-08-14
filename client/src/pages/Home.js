import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Skeleton, Box } from "@mui/material";
import PostCard from "../components/PostCard";
import { getPosts } from "../redux/features/postSlice";

const useStyles = makeStyles({
  cardParent: {
    padding: "1rem",
  },
  CardContainer: {
    width: "80%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "1rem auto",
    ["@media (min-width:600px) and (max-width:1024px)"]: {
      width: "95%",
    },
    ["@media (min-width:1200px)"]: {
      width: "80%",
    },
  },
  loading: {
    width: "60%",
    margin: "1rem auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
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
        {new Array(6).fill(0).map((_, i) => (
          <Box sx={{ width: 300, marginRight: 2, my: 5 }} key={i}>
            <Skeleton variant="rectangular" width={300} height={220} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton />
              <Skeleton width="60%" />
              <Skeleton height="45px" />
            </Box>
          </Box>
        ))}
      </div>
    );
  }
  return (
    <div className={classes.cardParent}>
      <div className={classes.CardContainer}>
        {posts.length === 0 ? (
          <p style={{ color: "#fff", fontSize: "1.3rem" }}>
            No posts to show :(
          </p>
        ) : (
          posts.map((post) => (
            <div key={post._id}>
              <PostCard
                id={post._id}
                title={post.title}
                description={post.description}
                img={post.img}
                tags={post.tags}
                name={post.name}
                likes={post.likes}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
