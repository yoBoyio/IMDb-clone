import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//MUI stuff
import SearchIcon from "@material-ui/icons/Search";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import { fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
//icons
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
//Actions
import Logout from "../auth/Logout";
//Components and pages
import SearchBox from "./SearchBox";
import Watchlist from "../../pages/WatchlistPage";
import NavMovies from './NavMovie'
import DropdownMenu from './Dropdown'

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "2px",
  },
  title: {
    display: "block",
  },
  search: {
    position: "relative",
    borderRadius: "2px",
    backgroundColor: fade("#fff", 0.15),
    "&:hover": {
      backgroundColor: fade("#fff", 0.25),
    },
    marginRight: "2px",
    marginLeft: "3px",
    width: "auto",
  },
  sectionDesktop: {
    display: "block",
  },
  appbar: {
    background: "linear-gradient(45deg, #9d50bb 30%, #6e48aa 90%)",
    boxShadow: "0 3px 5px 2px rgba(255	, 175, 189, .2)",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    "&:hover": {
      textDecoration: "none",
      color: "#fff",
    },
  },
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    lineHeight: 1.5,

    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: 'white',
      boxShadow: 'none',
    },

  }
};

class AppNavBar extends Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null,
    };
  }
  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, auth } = this.props;
    const isMenuOpen = this.state.anchorEl;


    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={this.handleMenuClose}> <Logout /> </MenuItem>
      </Menu>
    );

    const watchlist = auth.isAuthenticated ? (
      <Fragment>
        <Button className={classes.root} disableRipple color="inherit" component={Link} to="/watchlist">
          Watchlist
        </Button>
      </Fragment>
    ) : null;

    return (

      <div className={classes.grow}>
        <AppBar className={classes.appbar} position="static">
          <Toolbar className="nav-container">
            <Fragment>
              <Typography className={classes.title} variant="h4" noWrap>
                <Link className={classes.link} color="action" to="/">
                  IMDb
                </Link>
              </Typography>
            </Fragment>

            <div className={classes.grow} />
            {/*=======Movies list=========*/}
            <DropdownMenu />
            {/*=======Watchlist=========*/}
            {watchlist}
            {/*=======SEARCH=========*/}
            <Fragment>
              <IconButton className={classes.root} component={Link} to="/search">
                <SearchIcon />
              </IconButton>
            </Fragment>

            <div className={classes.sectionDesktop}>
              {auth && auth.isAuthenticated ? (
                <Fragment>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Fragment>
              ) : (
                <Fragment>
                  <Button className={classes.root} color="inherit" component={Link} to="/login">
                    Login
                  </Button>

                  <Button className={classes.root} color="inherit" component={Link} to="/signup">
                    Signup
                  </Button>
                </Fragment>
              )}
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withStyles(styles)(connect(mapStateToProps, null)(AppNavBar));
