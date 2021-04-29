import React, { useState, useEffect, useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { clearErrors } from '../redux/actions/errorActions';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MyTextField, StyledButton, StyledLink } from '../util/MyTextfield';

const useStyles = makeStyles((theme) => ({
  paper: {
    color: 'white',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      textDecoration: 'none',
    }
  }
}));

function LoginModal(props) {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleToggle = useCallback(() => {
    // Clear errors
    props.clearErrors();
  }, [props.clearErrors]);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    // Create user object
    const user = {
      name,
      email,
      password
    };
    // Attempt to login
    props.register(user);
  };

  useEffect(() => {
    // Check for register error
    if (props.error.id === 'REGISTER_FAIL') {
      setMsg(props.error.msg);
      //clear errors after 5 seconds
      setTimeout(() => {
        handleToggle();
      }, 5000);
    } else {
      setMsg(null);
    }

    if (props.isAuthenticated) {
      handleToggle();
      props.history.push('/')
    }
  }, [props.error, handleToggle, props.isAuthenticated]);
  //clear errors after 5 seconds
  setTimeout(() => {
    handleToggle();
  }, 5000);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
      </Typography>
        {msg ? <Alert severity="error"> {msg}</Alert> : null}
        <form className={classes.form} onSubmit={handleOnSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <MyTextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={handleChangeName}
              />
            </Grid>

            <Grid item xs={12}>
              <MyTextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChangePassword}
              />
            </Grid>

          </Grid>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
        </StyledButton>
          {props.loading && (
            <CircularProgress size={30} className={classes.progress} />
          )}
          <Grid container justify="flex-end">
            <Grid item>
              Already have an account?
              <StyledLink to="/login" variant="body2">
                Sign in
            </StyledLink>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  loading: state.auth.isLoading
});


export default connect(mapStateToProps, { register, clearErrors })(LoginModal);