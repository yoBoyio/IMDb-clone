import React, { Component } from "react";
import { connect } from "react-redux";
import MovieCard from "../components/movies/MovieCard";
import { makeStyles } from "@material-ui/core/styles";
import { searchMovies } from "../redux/actions/movieActions";
import MicIcon from "@material-ui/icons/Mic";
import { IconButton } from "@material-ui/core";
import { InputBase } from "@material-ui/core";
import SentimentDissatisfiedSharpIcon from "@material-ui/icons/SentimentDissatisfiedSharp";
import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
// import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavItem } from "reactstrap";

const useStyles = makeStyles((theme) => ({
  main: {
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
  search: {
    display: "flex",
    margin: "15px 0",
  },
  centered: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "180%",
  },
}));

//-----------------SPEECH RECOGNITION SETUP---------------------
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

//------------------------COMPONENT-----------------------------

function SearchPage(props) {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState(1);
  const [listening, setListening] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [submittedtext, setSubmittedtext] = useState(null);
  const movies = props.movies;

  const handleListen = () => {
    if (!recognition.listening) {
      recognition.start();
      recognition.onresult = (event) => {
        let interimTranscript = "";
        var finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalTranscript += transcript + " ";
          else interimTranscript += transcript;
        }
        console.log(finalTranscript);
        setSearchText(finalTranscript);
      };
    } else {
      recognition.end();
    }
  };
  onsubmit = () => {
    props.searchMovies(`?query=${searchText}`);
    window.history.replaceState(
      null,
      "new page title",
      `/search/?query=${searchText}`
    );
    setSubmittedtext(searchText);
    setSubmit(true);
  };

  useEffect(() => {
    if (submit) {
      setSubmit(false);
    }

    window.scroll(0, 0);

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className={classes.search}>
          <TextField
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            style={{ flex: 1 }}
            label="Search..."
            variant="filled"
            autoFocus
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onsubmit();
              }
            }}
          />
          <IconButton onClick={handleListen}>
            <MicIcon />
          </IconButton>
          <Button
            onClick={onsubmit}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
      </ThemeProvider>

      <div className={classes.main}>
        {movies.length > 0
          ? movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id}></MovieCard>
            ))
          : null}
      </div>
      {searchText && movies.length == 0 && submittedtext ? (
        <div className={classes.centered}>
          <SentimentDissatisfiedSharpIcon style={{ fontSize: 100 }} />
          No Movie with the name — <strong>{submittedtext}</strong> was found.
        </div>
      ) : null}

      {/* {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )} */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  movies: state.movie.searchMovies,
});
export default connect(mapStateToProps, { searchMovies })(SearchPage);
