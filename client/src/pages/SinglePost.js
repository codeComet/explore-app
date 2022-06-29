import React from "react";
import { makeStyles } from "@mui/styles";
import { Chip, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const useStyles = makeStyles({
  singlePostParent: {
    padding: "1rem",
  },
  singlePostContainer: {
    width: "60%",
    margin: "2rem auto",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  imgContainer: {
    width: "50%",
    textAlign: "center",
    "& img": {
      width: "90%",
      objectFit: "contain",
      borderRadius: "5px",
      boxShadow: "10px 10px 30px rgb(0 0 0 / 70%)",
      transition: "transform .4s ease-in-out",
    },
    "& img:hover": {
      transform: "scale(1.2)",
    },
  },
  infoContainer: {
    width: "48%",
    marginLeft: "2%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "1rem 0",
  },
  tags: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "1rem 0",
  },
  title: {
    fontFamily: "Poppins, sans-serif !important",
    color: "white",
    width: "80%",
  },
  heart: {
    width: "20%",
    textAlign: "right",
  },
  tagText: {
    fontFamily: "Poppins, sans-serif !important",
    marginRight: "10px !important",
    color: "#c9c9c9",
  },
  chips: {
    margin: "0 0.2rem",
  },
  description: {
    color: "#e5e5e5",
    fontSize: "1rem !important",
    margin: "1rem 0 !important",
    lineHeight: "1.5rem !important",
  },
  creator: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const SinglePost = () => {
  const classes = useStyles();

  return (
    <div className={classes.singlePostParent}>
      <div className={classes.singlePostContainer}>
        <div className={classes.imgContainer}>
          <img
            src="https://images.unsplash.com/photo-1656356594129-2dae4ec88923?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
            alt="img"
          />
        </div>
        <div className={classes.infoContainer}>
          <div className={classes.header}>
            <Typography variant="h3" className={classes.title}>
              Title
            </Typography>
            <div className={classes.heart}>
              <FavoriteBorderIcon style={{ color: "#fff" }} />
            </div>
          </div>
          <Typography variant="body2" className={classes.description}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
            asperiores eum iure temporibus quia voluptatibus praesentium veniam
            dolorum dolore eaque, labore adipisci ducimus repudiandae quos! Ut
            incidunt maxime molestias in.
          </Typography>
          <div className={classes.tagsContainer}>
            <div className={classes.tags}>
              <Typography variant="body2" className={classes.tagText}>
                Tags:
              </Typography>
              <Chip
                label="tag1"
                variant="outlined"
                color="warning"
                size="small"
                className={classes.chips}
              />
              <Chip
                label="tag2"
                variant="outlined"
                color="warning"
                size="small"
                className={classes.chips}
              />
              <Chip
                label="tag3"
                variant="outlined"
                color="warning"
                size="small"
                className={classes.chips}
              />
            </div>
            <div className={classes.creator}>
              <Typography variant="body2" className={classes.tagText}>
                John doe
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
