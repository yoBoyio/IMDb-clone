import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import SentimentDissatisfiedSharpIcon from "@material-ui/icons/SentimentDissatisfiedSharp";

import MovieCard from "../components/movies/MovieCard";
import { StyledButton } from "../util/MyTextfield";

const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    background: "#9d50bb",
    flexWrap: "wrap",
    position: "auto",
    display: "auto",
    fontSize: "150%",
  },
  displayMovies: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: "30px",
    marginRight: "30px",
    padding: "100px",
    width: "100",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "",
  },
  button: {
    marginTop: "5px",
    padding: "0",
    maxWidth: "100%",
    width: "200%",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "50px",
  },
  centered: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "180%",
  },
}));

function LanguagePage() {
  const [languages, setLanguages] = useState();
  const [iso, setIso] = useState();
  const [englishname, setEnglishName] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [showmessage, setShowmessage] = useState(false);

  const classes = useStyles();

  const fetchLanguages = () => {
    setLoading(true);

    axios
      .get(
        `https://api.themoviedb.org/3/configuration/languages?api_key=2eff1592c2104c03f9098af2aee54824`
      )
      .then((response) => {
        setLanguages(response.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  //onInputMethod

  const onInput = () => {
    setCurrentMovie([]);
    var search_language = document.getElementById("language").value;
    var list = document.getElementById("list").childNodes;
    for (var i = 0; i < list.length; i++) {
      if (list[i].value === search_language) {
        setIso(list[i].id);
        searchbyIso(list[i].id);
        setEnglishName(list[i].value);
        break;
      }
    }
  };
  const searchbyIso = (iso) => {
    setCurrentPage(1);
    setPage(false);
    setShowmessage(true);
    setLoading(true);
    axios
      .get(`https://localhost:44324/api/MovieShowcase/Search/lang?lang=${iso}`)
      .then((response) => {
        setLoading(false);
        setCurrentMovie(response.data);

        if (response.data.length === 20) {
          setPage(true);
        } else {
          setPage(false);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  //Next Page found
  const nextPage = () => {
    setLoading(true);
    setCurrentPage(currentPage + 1);
    axios
      .get(
        `https://localhost:44324/api/MovieShowcase/Search/lang?lang=${iso}&page=${currentPage}`
      )
      .then((response) => {
        setLoading(false);

        if (response.data.length < 20) {
          setPage(false);
        }

        setCurrentMovie([...currentMovie, ...response.data]);
      });
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  //mapping
  let mappingLanguages = languages
    ? languages.map((language) => (
        <option id={language.iso_639_1} value={language.englishName}>
          {language.english_name}
        </option>
      ))
    : null;

  let mappingmovies =
    currentMovie && currentMovie.length !== 0
      ? currentMovie.map((movie) => (
          <MovieCard movie={movie} key={movie.id}></MovieCard>
        ))
      : null;

  let displayInfo = !loading ? (
    mappingmovies
  ) : (
    <CircularProgress size="100px" thickness="5.6" />
  );

  return (
    <div>
      <div style={{ marginTop: 25 }}>
        <input type="text" list="list" id="language" onInput={onInput} />
        <datalist id="list">{mappingLanguages}</datalist>
      </div>

      <div className={classes.displayMovies}>
        {" "}
        {currentMovie && currentMovie.length !== 0 ? (
          displayInfo
        ) : showmessage ? (
          <div className={classes.centered}>
            <SentimentDissatisfiedSharpIcon style={{ fontSize: 100 }} />
            We didn't find any — <strong>{englishname}</strong> movies.
          </div>
        ) : null}
      </div>


      <div className={classes.button}>
        {page && currentMovie.length !== 0 ? (
          <StyledButton
            style={{ width: "300px", fontSize: "0.4em", fontWeight: "200" }}
            onClick={nextPage}
          >
            Load More{" "}
          </StyledButton>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default LanguagePage;
