import React from "react";
import notFoundImg from "../img/404.jpg";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.notFoundParent}>
      <img src={notFoundImg} alt="404" />
      <Link to={`/`}>
        <Button variant="contained" color="primary">
          Back to homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;

const useStyles = makeStyles({
  notFoundParent: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    "& img": {
      marginTop: "3rem",
      width: "50%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    "& a": {
      textDecoration: "none",
    },
  },
});
