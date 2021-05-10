import React, { Component, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MyaccountMenu from "./MyaccountMenu";
import ChangePassword from "./ChangePassword";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MyTextField, StyledButton, StyledLink } from "../util/MyTextfield";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  leftDiv: {
    // flex: "auto",
    // position: "relative",
    // marginInline: "auto",
    maxWidth: "72rem",
    paddingInlineStart: "2rem",
    paddingInlineEnd: "2rem",
    // paddingTop: "2rem",
    // paddingBottom: "1rem",
    // marginLeft: "-200px",
    borderWidth: "0px",
    borderStyle: "solid",
    boxSizing: "border-box",
    textAlign: "center",
    justifyContent: "center",
    // height: "30px",
    width: "400px",
    // left: "0px",
    display: "flex",
    // marginTop: "-150px",
  },
  heading: {
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: "0.75rem",
    marginBottom: "1.25rem",
  },
  body: {
    // display: "grid",
    marginLeft: "0px",
    paddingLeft: "0px",
    width: "100%",
  },
  form: {
    width: "50%",
    height: "100%",
    marginTop: theme.spacing(-15),
    marginLeft: "auto",
    marginRight: "auto",
  },
  form2: {
    width: "30%",
    // height: "10%",
    // marginTop: theme.spacing(3),
    // marginLeft: "0px",
    // // marginBottom: "5000px",
    // marginRight: "800px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    position: "relative",
  },
  majorKey: {
    display: "flex",
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

function MyAccountPage({ user }) {
  const [page, setPage] = useState(1);
  useEffect(() => {}, []);

  const classes = useStyles();
  return (
    <>
      <h2 className={classes.lettersDisplay}>{user ? user.UserName : null}</h2>
      <div className={classes.majorKey}>
        {console.log(page)}
        <MyaccountMenu page={page} setPage={setPage} />
        {page == 1 ? (
          <div className={classes.leftDiv}>
            <div className={classes.heading}></div>

            <div className={classes.body}>
              <br></br>
              <div className={classes.form2}>
                <h3 className={classes.itemdescription}>
                  Username: {user ? user.UserName : null}
                </h3>
                <br></br>
                <h3 className={classes.itemdescription}>
                  Email: {user ? user.UserEmail : null}
                </h3>
              </div>
            </div>
          </div>
        ) : page == 2 ? (
          <div className={classes.body}>
            <ChangePassword />
          </div>
        ) : null}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(MyAccountPage);
