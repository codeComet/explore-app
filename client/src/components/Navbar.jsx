import { useState } from "react";
import {
  Badge,
  MenuItem,
  Tooltip,
  Button,
  Avatar,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormControl,
} from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import { useDispatch, useSelector } from "react-redux";
import { deepOrange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { setLogout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import useComponentVisible from "../customHooks/useComponentVisible";
import { searchPost } from "../redux/features/postSlice";
import decode from "jwt-decode";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state?.auth?.user);
  const token = user?.token;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout);
    }
  }

  // for searchbar visibility toggle
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);

  const pages = [
    { name: "Home", link: "/" },
    { name: "Add post", link: "/addPost" },
    { name: "Dashboard", link: `/dashboard/${user?.result?._id}` },
    { name: "Blogs", link: "/blogs" },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearchBarShow = () => {
    setIsComponentVisible(true);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.clear();
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.length > 0) {
      dispatch(searchPost(search));
      navigate("/posts/search?searchQuery=" + search);
    } else {
      navigate("/");
    }
  };

  return (
    <AppBar position="sticky" style={{ background: "#011120" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ExploreIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Explore
          </Typography>

          {user ? (
            <Box
              sx={{
                flexGrow: { xs: 0, sm: 1, md: 1 },
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      component="a"
                      href={page.link}
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
          )}
          <ExploreIcon
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: { xs: 1, sm: 0, md: 0 },
              mr: 1,
              justifyContent: "flex-start",
            }}
          />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "none", sm: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Explore
          </Typography>

          {user ? (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  component="a"
                  href={page.link}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          ) : (
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
          )}

          {/* Conditional rendering */}
          {user ? (
            <Box
              sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}
              ref={ref}
            >
              {isComponentVisible ? null : (
                <Button onClick={handleSearchBarShow}>
                  <SearchIcon style={{ color: "#FFF" }} />
                </Button>
              )}
              {isComponentVisible ? (
                <form onSubmit={handleSearchSubmit}>
                  <FormControl
                    sx={{
                      my: 1,
                      marginRight: {
                        xs: "0rem",
                        xs: "1rem",
                        md: "1rem",
                        lg: "2rem",
                      },
                      width: { xs: "15ch", sm: "25ch" },
                      transition: "width 0.4s ease-in-out",
                    }}
                    variant="outlined"
                    className={classes.root}
                    size="small"
                  >
                    <InputLabel htmlFor="outlined-adornment-search">
                      Search
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-search"
                      type="text"
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton edge="end" type="submit">
                            <SearchIcon style={{ color: "#FFF" }} />
                          </IconButton>
                        </InputAdornment>
                      }
                      label="search"
                    />
                  </FormControl>
                </form>
              ) : null}
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      sx={{ bgcolor: deepOrange[500] }}
                      alt={user?.result?.name}
                      src="/static/images/avatar/2.jpg"
                    />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Account</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 2, color: "white", display: "inline-block" }}
                component="a"
                href="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "inline-block" }}
                component="a"
                href="/register"
              >
                Sign up
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0069D9",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0069D9",
    },
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "#fff",
    },
    "& .MuiInputLabel-outlined": {
      color: "white",
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "white",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "white",
    },
  },
});
