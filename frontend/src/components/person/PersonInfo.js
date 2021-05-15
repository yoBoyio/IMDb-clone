import React from "react";
import ModalImg from "./ModalImg";
import "../styles/PersonInfo.css";
import { unavailable } from "./Config.js";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ContentModal from "../movies/ContentModal";

//Table Styles
const StyledTableCell = withStyles((theme) => ({
  head: {
    background: "#8b4db5",
    color: theme.palette.common.white,
    fontSize: 16,
    fontStyle: "bold",
    padding: "12pt",
  },
  body: {
    width: "250px",
    background: "#282c34",
    fontSize: 15,
    color: "white",
  },
}))(TableCell);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const PersonInfo = (props) => {
  const classes = useStyles();

  return (
    <div className="wrapper">
      <div className="profile_image">
        <ModalImg>
          {" "}
          <img
            src={`${props.image ? props.image : unavailable}`}
            alt="pic"
          />{" "}
        </ModalImg>
        <span className="infoPI">
          <div>
            {" "}
            <p></p> <h4> Personal Info</h4> <b> Known For </b>{" "}
            <p> {props.personKnown} </p>{" "}
          </div>
          <div>
            {" "}
            <b> Birthday </b> <p> {props.personBirthday} </p>{" "}
          </div>
          <div>
            {" "}
            <b> Place of Birth </b> <p> {props.personBirthPlace} </p>{" "}
          </div>
          <div>
            <b>Also Known As</b>
            {props.personAlias &&
              props.personAlias.map((person, index) => (
                <p> {props.personAlias[index]} </p>
              ))}
          </div>
        </span>
      </div>
      <div className="bio">
        <h2 className="namePI">{props.personName} </h2>
        <p> </p>
        <h4> Biography </h4> <p> {props.personBio}</p> <p> </p>
        <div className="film">
          <h4> Filmography </h4>
          <TableContainer>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <b>Movie</b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <b>Character </b>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <b>Release Date</b>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              {props.credits &&
                props.credits.map((credit, index) => (
                  <TableBody>
                    <TableRow>
                      <StyledTableCell component="th" scope="row">
                        <ContentModal id={credit.id}>
                          {" "}
                          {credit.title}{" "}
                        </ContentModal>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {credit.character}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {credit.release_date}
                      </StyledTableCell>
                    </TableRow>
                  </TableBody>
                ))}
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default PersonInfo;
