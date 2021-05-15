import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from "../redux/actions/authActions";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainDiv: {

    width: "10%",
    top: "91px",
    borderWidth: "0px",
    borderStyle: "solid",
    boxSizing: "border-box",
  },
  accountUsername: {
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
  },
  lettersDisplay: {
    fontFamily: "RingsideWide-Medium",
    fontWeight: "700",
    fontSize: "1.5rem",
    lineHeight: "32px",
    letterSpacing: "-0.6px",
    paddingBottom: "1rem",
  },
  sidebarnav: {
    top: "auto",
    position: "relative",
    padding: "0px",
    display: "inline-block",
    background: "linear-gradient(45deg, #9d50bb 30%, #6e48aa 90%)",
    width: "200px",
  },
  menuTitle: {
    fontSize: "1rem",
    fontFamily: "RingsideWide-Medium",
    color: "#0F0F0F",
  },
  itemsinsidebar: {
    padding: "0.75rem",
  },
  flexrow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    display: "inherit",
    alignItems: "center",
  },
  icons: {

    width: "40px",
    height: "40px",
    display: "inline-block",
    lineHeight: "1em",
    marginTop: "0px",
  },
  flexCol: {
    display: "inherit",
    flexDirection: "column",
  },
  itemTitle: {
    fontFamily: "RingsideWide-Medium",
    fontSize: "0.875rem",
    fontWeight: "500",
    letterSpacing: "-0.4px",
    lineHeight: "15px",
    paddingLeft: "7px",
    marginBottom: "0px",
    paddingTop: "10px",
  },
  itemdescription: {
    fontFamily: "RingsideWide-Medium",
    fontSize: "0.75rem",
    fontWeight: "300",
    paddingLeft: "7px",
    lineHeight: "10px",
  },
  flexcointainer: {
    display: "flex",
  },
  flexLeft: {
    flex: "10%",
  },
  flexRight: {
    flex: "90%",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    "&:hover": {
      textDecoration: "none",
      color: "#fff",
    },
  },
}));

function MyaccountMenu(props) {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const goToHome = redirect ? <Redirect to="/" /> : null;

  useEffect(() => {
    // // if not authenticated
    if (!props.isAuthenticated) {
      setRedirect(true);
    }
  }, [props.error, props.isAuthenticated]);

  const handlePage = () => {
    props.setPage(1);
  };
  const handlePage2 = () => {
    props.setPage(2);
  };

  return (
    <>
      {goToHome}
      <div className={classes.mainDiv}>
        <div style={{ height: "5px" }}></div>
        <div className={classes.flexcointainer}>
          <div className={classes.flexLeft}>
            <div className={classes.sidebarnav}>
              <p className={classes.menuTitle}></p>
              <div className={classes.itemsinsidebar}>
                <Link
                  className={classes.link}
                  color="action"
                  onClick={handlePage}
                >
                  <div className={classes.flexrow}>
                    <div className={classes.left}>
                      <AccountBoxIcon
                        style={{ fontSize: "large" }}
                        className={classes.icons}
                      />
                      <div className={classes.flexCol}>
                        <p className={classes.itemTitle}>Profile</p>
                        <p className={classes.itemdescription}>
                          Learn what's unique to you
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                <br></br>
                <Link
                  className={classes.link}
                  color="action"
                  onClick={handlePage2}
                >
                  <div className={classes.flexrow}>
                    <div className={classes.left}>
                      <VpnKeyIcon
                        style={{ fontSize: "large" }}
                        className={classes.icons}
                      />
                      <div className={classes.flexCol}>
                        <p className={classes.itemTitle}>Password</p>
                        <p className={classes.itemdescription}>
                          Change your password
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                <br></br>
                <Link
                  className={classes.link}
                  color="action"
                  onClick={props.logout}
                >
                  <div className={classes.flexrow}>
                    <div className={classes.left}>
                      <ExitToAppIcon
                        style={{ fontSize: "large" }}
                        className={classes.icons}
                      />
                      <div className={classes.flexCol}>
                        <p className={classes.itemTitle}>Logout</p>
                        <p className={classes.itemdescription}>
                          Have a nice day
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout }, null)(MyaccountMenu);
