import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";
import PostCard from "../components/PostCard";
import { getPosts } from "../redux/features/postSlice";

const useStyles = makeStyles({
  cardParent: {
    padding: "1rem",
  },
  CardContainer: {
    width: "60%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
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
