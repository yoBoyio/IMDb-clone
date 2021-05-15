import React, { useEffect, useState } from "react";
import PersonInfo from "../components/person/PersonInfo";
import "../components/styles/PersonInfo.css";

const PersonDetailsPage = (props) => {
  const [Person, setPerson] = useState([]);
  const [Credits, setCredits] = useState([]);
  // const classes = useStyles();

  useEffect(() => {
    const personId = props.match.params.personId;

    fetch(
      `https://api.themoviedb.org/3/person/${personId}?api_key=2eff1592c2104c03f9098af2aee54824&language=en-US`
    )
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        setPerson(response);
      });

    fetch(
      `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=2eff1592c2104c03f9098af2aee54824`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        setCredits(response.cast);
      });
  }, []);

  return (
    <div>
      {console.log(Credits.title)}
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
        credits={Credits}
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
                        <ContentModal id={credits.id}>
                          {credits.title}
                        </ContentModal>
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
