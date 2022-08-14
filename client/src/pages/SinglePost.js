import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Chip, Typography, Skeleton, Box } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../redux/features/postSlice";

const SinglePost = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singlePost } = useSelector((state) => state.post);

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id));
    }
  }, [id]);

  return (
    <div className={classes.singlePostParent}>
      {Object.keys(singlePost).length === 0 ? (
        <div className={classes.loading}>
          <Box sx={{ width: "58%", marginRight: "2%", my: 5 }}>
            <Skeleton variant="rectangular" width={"100%"} height={450} />
          </Box>
          <Box sx={{ width: "40%", pt: 5 }}>
            <Skeleton height="30px" />
            <Skeleton className={classes.skeleton} />
            <Skeleton width="80%" className={classes.skeleton2} />
            <Skeleton height="45px" />
          </Box>
        </div>
      ) : (
        <div className={classes.singlePostContainer}>
          <div className={classes.imgContainer}>
            <img src={singlePost?.img} alt={singlePost?.title} />
          </div>
          <div className={classes.infoContainer}>
            <div className={classes.header}>
              <Typography variant="h3" className={classes.title}>
                {singlePost?.title}
              </Typography>
              <div className={classes.heart}>
                <FavoriteBorderIcon style={{ color: "#fff" }} />
              </div>
            </div>
            <Typography variant="body2" className={classes.description}>
              {singlePost?.description}
            </Typography>
            <div className={classes.tagsContainer}>
              <div className={classes.tags}>
                <Typography variant="body2" className={classes.tagText}>
                  Tags:
                </Typography>
                {singlePost?.tags.map((tag, i) => (
                  <Chip
                    key={i}
                    label={tag}
                    variant="outlined"
                    color="warning"
                    size="small"
                    className={classes.chips}
                  />
                ))}
              </div>
              <div className={classes.creator}>
                <Typography variant="body2" className={classes.tagText}>
                  by - {singlePost?.name}
                </Typography>
              </div>
            </div>
            <div className={classes.postDate}>
              <Typography variant="body2" className={classes.tagText}>
                posted on - {singlePost?.createdAt.split("T")[0]}
              </Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;

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
      width: "80%",
      objectFit: "contain",
      borderRadius: "5px",
      boxShadow: "10px 10px 30px rgb(0 0 0 / 70%)",
      transition: "transform .4s ease-in-out",
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
  loading: {
    width: "60%",
    margin: "1rem auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "80vh",
  },
  skeleton: {
    height: "350px !important",
    transformOrigin: "0 10% !important",
  },
  skeleton2: {
    marginTop: "-100px !important",
  },
});
