import React, { useState, useEffect, useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { login } from '../redux/actions/authActions';
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

    width: '100%',
    height: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    position: 'absolute'
  }
}));

function LoginModal(props) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleToggle = useCallback(() => {
    // Clear errors
    props.clearErrors();

  }, [props.clearErrors]);

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const user = { email, password };
    // Attempt to login
    props.login(user);

  };

  useEffect(() => {
    // Check for register error
    if (props.error.id === 'LOGIN_FAIL') {
      setMsg(props.error.msg);
      //clear errors after 5 seconds
      setTimeout(() => {
        handleToggle();
      }, 5000);
    } else {
      setMsg(null);
    }
    // If authenticated, go to home 
    if (props.isAuthenticated) {
      handleToggle();
      props.history.push('/')
    }
  }, [props.error, handleToggle, props.isAuthenticated,]);


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {msg ? <Alert severity="error"> {msg}</Alert> : null}

        <form className={classes.form} onSubmit={handleOnSubmit} noValidate>
          <MyTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChangeEmail}
          />
          <MyTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChangePassword}
          />

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </StyledButton>
          {props.loading && (
            <CircularProgress size={30} className={classes.progress} />
          )}
          <Grid container>
            <Grid item xs>
              <StyledLink href="#" variant="body2">
                Forgot password?
              </StyledLink>
            </Grid>
            <Grid item>
              Don't have an account?
              <StyledLink to="/signup" variant="body2">
                {" Sign Up"}
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
  loading: state.isLoading
});


export default connect(mapStateToProps, { login, clearErrors })(LoginModal);