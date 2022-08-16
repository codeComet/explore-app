import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTagPosts } from "../redux/features/postSlice";
import { makeStyles } from "@mui/styles";
import PostCard from "../components/PostCard";
import { Box } from "@mui/system";

const Tags = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { tag } = useParams();
  const { loading, tagPosts } = useSelector((state) => ({ ...state.post }));

  useEffect(() => {
    dispatch(getTagPosts(tag));
  }, [tag]);

  if (loading) {
    return (
      <div className={classes.loading}>
        <h2>Getting posts from tag: {tag}</h2>
      </div>
    );
  }
  return (
    <div className={classes.cardParent}>
      <div className={classes.CardContainer}>
        {tagPosts.length === 0 ? (
          <p style={{ color: "#fff", fontSize: "1.3rem" }}>
            No posts to show :(
          </p>
        ) : (
          <>
            <h2>Showing posts from tag: {tag}</h2>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: { xs: "-15px", sm: "0" },
              }}
            >
              {tagPosts.map((post) => (
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
              ))}
            </Box>
          </>
        )}
      </div>
    </div>
  );
};

export default Tags;

const useStyles = makeStyles({
  CardContainer: {
    width: "80%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    margin: "1rem auto",
    ["@media (min-width:600px) and (max-width:1024px)"]: {
      width: "95%",
    },
    ["@media (min-width:1200px)"]: {
      width: "80%",
    },
  },
  loading: {
    width: "80%",
    margin: "1rem auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    ["@media (min-width:600px) and (max-width:1024px)"]: {
      width: "95%",
    },
    ["@media (min-width:1200px)"]: {
      width: "80%",
    },
  },
});
