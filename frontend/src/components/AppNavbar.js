import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBox from './SearchBox'
import { StyledLink } from '../util/MyTextfield';

//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu'
//icons
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import purple from '@material-ui/core/colors/purple';
import Logout from './auth/Logout';



const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: '2px'
  },
  title: {
    display: 'none',
    display: 'block',
  },
  search: {
    position: 'relative',
    borderRadius: '2px',
    backgroundColor: fade('#fff', 0.15),
    '&:hover': {
      backgroundColor: fade('#fff', 0.25),
    },
    marginRight: '2px',
    marginLeft: 0,
    width: '100%',
    marginLeft: '3px',
    width: 'auto',
  },
  sectionDesktop: {
    display: 'block',

  },
  appbar: {
    background: 'linear-gradient(45deg, #9d50bb 30%, #6e48aa 90%)',
    boxShadow: '0 3px 5px 2px rgba(255	, 175, 189, .2)',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    '&:hover': {
      textDecoration: 'none',
      color: '#fff',
    }
  }
};

class AppNavBar extends Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null,
      setAnchorEl: null
    }
  }
  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  };
  handleMenuClose = () => {
    this.setState({ anchorEl: null })

  };
  render() {
    const { classes, auth } = this.props;
    const isMenuOpen = this.state.anchorEl;
    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={this.handleMenuClose}> <Logout /></MenuItem>
      </Menu>
    );
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
            <SearchBox />
            <div className={classes.sectionDesktop}>
              {//auth && auth.isAuthenticated
              }
              {auth && auth.isAuthenticated ? (
                <Fragment>

                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls='primary-search-account-menu'
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Fragment>
              ) : (
                <Fragment>
                  <Button color="inherit" component={Link} to="/login">Login</Button>

                  <Button color="inherit" component={Link} to="/signup">Signup</Button>
                </Fragment>
              )}
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}

      </div >
    )
  }
}

AppNavBar.propTypes = {
  auth: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withStyles(styles)(connect(mapStateToProps, null)(AppNavBar));