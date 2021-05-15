import React from "react";
import { connect } from "react-redux";
import MovieCard from "../components/movies/MovieCard";
import { makeStyles } from "@material-ui/core/styles";
import { searchMovies } from "../redux/actions/movieActions";
import MicIcon from "@material-ui/icons/Mic";
import { IconButton } from "@material-ui/core";
import SentimentDissatisfiedSharpIcon from "@material-ui/icons/SentimentDissatisfiedSharp";
import {
  Button,
  createMuiTheme,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  const [submit, setSubmit] = useState(false);
  const [submittedtext, setSubmittedtext] = useState(null);
  const movies = props.movies;
  const loading = props.loading;

  const handleListen = () => {
    if (!recognition.listening) {
      recognition.start();
      recognition.onresult = (event) => {
        var finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalTranscript += transcript + " ";

        }
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
  let mapping =
    movies.length > 0
      ? movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id}></MovieCard>
      ))
      : null;

  let displayInfo = !loading ? (
    mapping
  ) : (
    <CircularProgress size="100px" thickness="5.6" />
  );
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

      <div className={classes.main}>{displayInfo}</div>
      {searchText && movies.length === 0 && submittedtext && !loading ? (
        <div className={classes.centered}>
          <SentimentDissatisfiedSharpIcon style={{ fontSize: 100 }} />
          No Movie with the name — <strong>{submittedtext}</strong> was found.
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  movies: state.movie.searchMovies,
  loading: state.movie.searchLoading,
});
export default connect(mapStateToProps, { searchMovies })(SearchPage);
