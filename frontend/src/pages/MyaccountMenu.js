import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import MyAccountPage from "./MyAccountPage";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    position: "relative",
    left: "250px",
    marginLeft: "-250px",
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
    backgroundColor: "#ad42ff",
    width: "100%",
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
    // viewBox: "0 0 20 20",
    // widht: "1.5rem",
    // height: "1.5rem",
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
    // backgroundColor: "#FFF",
  },
}));

function MyaccountMenu() {
  const classes = useStyles();

  return (
    <div className={classes.mainDiv}>
      <div style={{ height: "5px" }}></div>
      <div className={classes.flexcointainer}>
        <div className={classes.flexLeft}>
          <div className={classes.accountUsername}>
            <h2 className={classes.lettersDisplay}>AccountUsername</h2>
          </div>
          <div className={classes.sidebarnav}>
            <p className={classes.menuTitle}></p>
            <div className={classes.itemsinsidebar}>
              <a href="/profile" style={{ color: "white" }}>
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
              </a>
              <br></br>
              <a href="/changepassword" style={{ color: "white" }}>
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
              </a>
            </div>
          </div>
        </div>
        {/* <div className={classes.flexRight}></div> */}
      </div>
    </div>
  );
}

export default MyaccountMenu;
