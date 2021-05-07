import React, { Component, useEffect, useState } from "react";
import PersonInfo from "../components/person/PersonInfo";
import FilmTable from "../components/person/FilmTable";
import "../components/person/PersonInfo.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const PersonDetailsPage = (props) => {
  const [Person, setPerson] = useState([]);
  const [Credits, setCredits] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const personId = props.match.params.personId;

    fetch(
      `https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPerson(res);

        fetch(
          `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}`
        )
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setCredits(res.cast);
          });
      });
  }, []);

  return (
    <div>
      <PersonInfo
        image={
          Person.profile_path
            ? `http://image.tmdb.org/t/p/w300/${Person.profile_path}`
            : null
        }
        personName={Person.name}
        personAlias={Person.also_known_as}
        personGender={Person.gender}
        personKnown={Person.known_for_department}
        personBirthday={Person.birthday}
        personBirthPlace={Person.place_of_birth}
        personBio={Person.biography}
        personHomepage={Person.homepage}
      />

      {/* Filmography table */}
      <div className="wrapper">
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
              {Credits &&
                Credits.map((credits, index) => (
                  <TableBody>
                    <TableRow>
                      <StyledTableCell component="th" scope="row">
                        {credits.title}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {credits.character}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {credits.release_date}
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

export default PersonDetailsPage;
