import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "block",
  },
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    lineHeight: 1.5,

    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "white",
      boxShadow: "none",
    },
  },
}));

function DropdownMenu() {
  const classes = useStyles();

  const [anchorEl, setanchorEl] = useState(null);
  const handleProfileMenuOpen = (event) => {
    setanchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setanchorEl(null);
  };

  const dropdown = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={anchorEl}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/Latest">
        Latest
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/Upcoming">
        Upcoming
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/TopRated">
        TopRated
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/genres">
        Genres
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/languages">
        Languages
      </MenuItem>
    </Menu>
  );
  return (
    <div>
      <Button
        className={classes.root}
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        Movies
      </Button>
      {dropdown}
    </div>
  );
}
export default DropdownMenu;
