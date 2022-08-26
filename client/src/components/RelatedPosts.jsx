import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import PostCard from "./PostCard";
import { makeStyles } from "@mui/styles";

const RelatedPosts = ({ relatedPosts, postId }) => {
  const classes = useStyles();

  return (
    <Box className={classes.relatedParent}>
      <Box className={classes.relatedContainer}>
        {relatedPosts && relatedPosts.length > 0 && (
          <>
            {relatedPosts.length > 1 && (
              <>
                <Typography variant="h5">Related Posts</Typography>
                <Divider />
              </>
            )}
            <Box className={classes.relatedPosts}>
              {relatedPosts
                .filter((post) => post._id !== postId)
                .splice(0, 3)
                .map((post, index) => (
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
                ))}
            </Box>
          </>
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
    ["@media (min-width:600px)"]: {
      width: "100%",
    },
  },
  relatedContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    "& h5": {
      color: "#fefefe",
      fontFamily: "Poppins, sans-serif !important",
      marginBottom: "1rem",
      ["@media (max-width:600px)"]: {
        fontSize: "15px",
      },
      ["@media (min-width:600px)"]: {
        fontSize: "20px",
      },
    },
    ["@media (max-width:600px)"]: {
      justifyContent: "center",
    },
  },
  relatedPosts: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    ["@media (max-width:600px)"]: {
      justifyContent: "center",
    },
  },
});
