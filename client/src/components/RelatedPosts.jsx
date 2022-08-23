import React from "react";
import { Box, Typography } from "@mui/material";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";

const RelatedPosts = () => {
  const { loading, relatedPosts } = useSelector((state) => ({ ...state.post }));
  const classes = useStyles();

  if (loading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Box className={classes.relatedParent}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        {relatedPosts.length === 0 ? (
          <Typography variant="body2">No posts to show :(</Typography>
        ) : (
          relatedPosts.map((post, index) => (
            <Box key={index}>
              <PostCard
                id={post._id}
                title={post.title}
                description={post.description}
                img={post.img}
                tags={post.tags}
                name={post.name}
                likes={post.likes}
              />
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default RelatedPosts;

const useStyles = makeStyles({
  relatedParent: {
    width: "80%",
    margin: "1rem auto",
    padding: "2rem 0",
  },
});
