import React, { useState, useEffect, useCallback } from "react";
import { MyTextField, StyledButton, StyledLink } from "../util/MyTextfield";
import { makeStyles } from "@material-ui/core/styles";
import { changePassword } from "../redux/actions/authActions";
import { clearErrors } from "../redux/actions/errorActions";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "grid",
    marginLeft: "0px",
    paddingLeft: "0px",
  },

  form2: {
    width: "30%",
    margin: " auto",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ChangePassword({
  changePassword,
  error,
  change_password,
  clearErrors,
}) {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [confirmnewpassword, setconfirmnewPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [wrongmsg, setWrongMsg] = useState("");

  const handleChangeNewPassword = (e) => setNewPassword(e.target.value);
  const handleChangeConfirmNewPassword = (e) =>
    setconfirmnewPassword(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleOnSubmit = (e) => {
    // handleToggle();
    e.preventDefault();
    if (confirmnewpassword !== newpassword) {
      setWrongMsg(
        "The passwords you enter are not identical or your current password is wrong"
      );
      return;
    }
    changePassword(password, newpassword);
  };

  useEffect(() => {
    // Check for register error
    if (error.id === "PASSWORD_FAILED") {
      setMsg(error.msg);
    } else {
      setMsg(null);
    }
    if (change_password !== null) {
      setMsg(change_password);
    }
  }, [error]);

  const handleToggle = useCallback(() => {
    // Clear errors
    clearErrors();
  }, [clearErrors]);

  return (
    <>
      <form className={classes.form2} onSubmit={handleOnSubmit} noValidate>
        {msg || newpassword !== confirmnewpassword ? (
          <Alert severity="error"> {wrongmsg}</Alert>
        ) :
          null}
        {change_password !== null &&
          msg &&
          newpassword == confirmnewpassword &&
          newpassword !== password ? (
          <Alert severity="success"> {msg}</Alert>
        ) :
          null}
        <MyTextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Enter current Password"
          type="password"
          id="password"
          autoComplete="password"
          onChange={handleChangePassword}
        />
        <MyTextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Enter new Password"
          type="password"
          id="password"
          autoComplete="new-password"
          onChange={handleChangeNewPassword}
        />
        <MyTextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Enter new Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleChangeConfirmNewPassword}
        />

        <StyledButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Change Password
        </StyledButton>
      </form>
    </>
  );
}

const mapStateToProps = (state) => ({
  change_password: state.auth.change_password,
  error: state.error,
});

export default connect(mapStateToProps, { changePassword, clearErrors })(
  ChangePassword
);
