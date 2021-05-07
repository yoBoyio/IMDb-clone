import React, { useContext, useEffect, useState } from "react";
import MovieCard from "../components/movies/MovieCard";
import { connect } from "react-redux";
import "../components/styles/watchlist.css";
import { getMovies } from "../redux/actions/movieActions";
import { StyledButton } from "../util/MyTextfield";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import IconButton from "@material-ui/core/IconButton";

//styles
const useStyles = makeStyles((theme) => ({
  displayMovies: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: "30px",
    marginRight: "30px",
    padding: "100px",
    paddingTop: "20px",
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
  arrowStyles: {
    background: "#9d50bb",
    marginLeft: "10px",
    boxShadow: "none",
    textTransform: "none",
    lineHeight: 1.5,
    "&:hover": {
      backgroundColor: "#9d50bb",
      boxShadow: "0 3px 5px 2px rgba(255	, 175, 189, .1)",
      transform: "scale(1.02)",
    },
  },
}));
function usePrevious(value) {
  const ref = React.useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const MoviesType = ({ getMovies, movies, loading, location }) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [newmovies, setNewmovies] = useState([]);
  const movieurl = location.pathname;
  const prevPathName = usePrevious(movieurl);
  const title = movieurl.slice(1, movieurl.length);
  //axios request with url param pathname
  useEffect(() => {
    if (prevPathName != movieurl) {
      //   setNewmovies(null);
      setCurrentPage(1);
      //   console.log("URL CHANGED");
    }
    getMovies(movieurl, currentPage);
    window.history.replaceState(
      null,
      "new page title",
      `${movieurl}?page=${currentPage}`
    );
    // if (currentPage > 1) {
    //   setNewmovies([...newmovies, ...movies]);
    // }
    // setNewmovies(movies);
  }, [movieurl, currentPage]);

  //Load More
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const PreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  //display the response
  let display =
    movies.length > 0 ? (
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id}></MovieCard>
        ))}
      </div>
    ) : null;

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>{title}</h1>
      <div className={classes.displayMovies}>{display}</div>
      <div className={classes.button}>
        {currentPage > 1 ? (
          <IconButton onClick={PreviousPage} className={classes.arrowStyles}>
            <ArrowBackIcon fontSize="large" style={{ color: "#FFF" }} />
          </IconButton>
        ) : null}

        <IconButton className={classes.arrowStyles} onClick={nextPage}>
          <ArrowForwardIcon fontSize="large" style={{ color: "#FFF" }} />
        </IconButton>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.movie.loading,
  movies: state.movie.movies,
});

export default connect(mapStateToProps, { getMovies })(MoviesType);
