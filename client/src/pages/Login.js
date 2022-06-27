import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Box,
  Button,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { googleLogin, login } from "../redux/features/authSlice";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleLogin } from "react-google-login";

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#e9e9e9",
  },

  logoContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => ({ ...state.auth }));

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);
    dispatch(login({ formData, navigate, toast }));
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const googleSuccess = (resp) => {
    const email = resp?.profileObj?.email;
    const name = resp?.profileObj?.name;
    const token = resp?.tokenId;
    const googleId = resp?.googleId;
    const result = { email, name, token, googleId };
    dispatch(googleLogin({ result, navigate, toast }));
    console.log(result);
  };

  const googleFailure = (error) => {
    toast.error(error);
  };

  return (
    <Box className={classes.container}>
      <Card sx={{ maxWidth: 400, padding: "1rem" }}>
        <Box className={classes.logoContainer}>
          <AccountCircleIcon style={{ fontSize: "3rem", color: "#35356d" }} />
          <Typography variant="h5">Sign in to your account</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <TextField
              variant="outlined"
              label="Your email"
              type="email"
              name="email"
              required
              fullWidth
              value={formData.email}
              sx={{ marginBottom: "1rem" }}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              required
              fullWidth
              onChange={handleChange}
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={loading}
            >
              Sign in
            </Button>
          </CardActions>

          <GoogleLogin
            clientId="725031431148-98vq8r72bca4dbtssddlkeidcvjjru7v.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                variant="contained"
                color="warning"
                style={{ width: "96%", margin: "0px 8px" }}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <GoogleIcon style={{ marginRight: "5px" }} /> Sign-in with
                Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
            plugin_name="React"
          />
        </form>
        <Divider sx={{ margin: "0.5rem 0" }} />
        <Box sx={{ textAlign: "center" }}>
          <Link to={"/register"} style={{ textDecoration: "none" }}>
            <Button>Don't have an account? Signup now!</Button>
          </Link>
        </Box>
      </Card>
    </Box>
  );
}
