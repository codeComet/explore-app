import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleUserPosts } from "../redux/features/postSlice";
import {
  Skeleton,
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  Chip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { deletePost } from "../redux/features/postSlice";
import { toast } from "react-toastify";

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.result?._id;
  const { postsFromUser, loading } = useSelector((state) => ({
    ...state.post,
  }));

  useEffect(() => {
    if (userId) {
      dispatch(getSingleUserPosts(userId));
    }
  }, [userId]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost({ id, toast }));
    }
  };

  const excerpt = (str) => {
    if (str.length > 60) {
      str = str.slice(0, 60) + "...";
    }
    return str;
  };

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
    <div className={classes.dashboardParent}>
      <h1>Dashboard</h1>
      <div className={classes.dashboardContainer}>
        {postsFromUser &&
          postsFromUser.map((post) => (
            <div key={post._id} className={classes.singlePost}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: "#00073a !important",
                  // boxShadow: "2px 5px 8px #060505cc !important",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 151, height: 151, backgroundSize: "cover" }}
                    image={post.img}
                    alt={post.title}
                  />
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <CardContent sx={{ flex: "1 0 auto", width: "80%" }}>
                      <Typography component="div" variant="h5">
                        {post.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        {excerpt(post.description)}
                      </Typography>
                      <Box className={classes.tags}>
                        {post.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            className={classes.tag}
                            variant="outlined"
                            color="primary"
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Box>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", px: 2, pb: 1 }}
                >
                  <Link to={`/editPost/${post._id}`}>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  </Link>

                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(post._id)}
                  >
                    <DeleteIcon style={{ color: "red" }} />
                  </IconButton>
                </Box>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;

const useStyles = makeStyles({
  dashboardParent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& h1": {
      fontSize: "2rem",
      color: "white",
      margin: "1rem",
    },
  },
  dashboardContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "1rem auto",
    justifyContent: "space-around",
    flexWrap: "wrap",
    alignItems: "center",
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
  singlePost: {
    width: "45%",
    margin: "1rem auto",
  },

  tag: {
    margin: ".5rem .3rem 0 0",
  },
});
