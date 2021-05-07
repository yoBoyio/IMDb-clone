import React, { Component, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MyaccountMenu from "./MyaccountMenu";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MyTextField, StyledButton, StyledLink } from "../util/MyTextfield";

const useStyles = makeStyles((theme) => ({
  leftDiv: {
    flex: "auto",
    position: "relative",
    marginInline: "auto",
    maxWidth: "72rem",
    paddingInlineStart: "2rem",
    paddingInlineEnd: "2rem",
    paddingTop: "2rem",
    paddingBottom: "1rem",
    marginRight: "-200px",
    borderWidth: "0px",
    borderStyle: "solid",
    boxSizing: "border-box",
    textAlign: "center",
    justifyContent: "center",
    height: "30px",
    left: "0px",
    display: "flex",
    marginTop: "-150px",
  },
  heading: {
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: "0.75rem",
    marginBottom: "1.25rem",
  },
  body: {
    display: "grid",
    marginLeft: "0px",
    paddingLeft: "0px",
  },
  form: {
    width: "100%",
    height: "100%",
    marginTop: theme.spacing(3),
  },
  form2: {
    width: "100%",
    height: "100%",
    marginTop: theme.spacing(3),
    marginLeft: "0px",
    marginBottom: "5000px",
    marginRight: "800px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    position: "relative",
  },
  all: {
    position: "relative",
  },
  itemdescription: {
    fontFamily: "RingsideWide-Medium",
    fontSize: "100",
    fontWeight: "300",
    paddingLeft: "2px",
    lineHeight: "30px",
    textAlign: "left",
  },
}));

function MyAccountPage() {
  useEffect(() => {
    if (window.location.pathname == "/profile") {
      console.log("profile page");
      setCurrentPage(1);
    } else {
      console.log("changePassword page");
      setCurrentPage(2);
    }
  }, []);

  const [page, setCurrentPage] = useState(1);

  const classes = useStyles();
  return (
    <div className={classes.all}>
      <MyaccountMenu />
      <div className={classes.leftDiv}>
        <div className={classes.heading}></div>
        {page == 1 ? (
          <div className={classes.body}>
            <br></br>
            <div className={classes.form2}>
              <h3 className={classes.itemdescription}>Username: </h3>
              <br></br>
              <h3 className={classes.itemdescription}>Email: </h3>
            </div>
          </div>
        ) : (
          <div className={classes.body}>
            <form
              className={classes.form}
              // onSubmit={handleOnSubmit}
              noValidate
            >
              <MyTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Current Password"
                name="email"
                autoComplete="email"
                autoFocus
                //   onChange={handleChangeEmail}
              />
              <MyTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="New Password"
                name="email"
                autoComplete="email"
                autoFocus
                //   onChange={handleChangeEmail}
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
                //   onChange={handleChangePassword}
              />

              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                //   className={classes.submit}
              >
                Change Password
              </StyledButton>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAccountPage;
