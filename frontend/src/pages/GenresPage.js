import React from "react";
import { fetchGenre } from "../redux/actions/movieActions";
import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Chip } from "@material-ui/core";
import MovieCard from "../components/movies/MovieCard";
import { StyledButton } from "../util/MyTextfield";

//-----------------AXIOS----------------------------------------
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
}));

function GenresPage() {
  const [content, setContent] = useState();
  const [pageText, setPageText] = useState();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalresults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, settotalPages] = useState(1);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [genreId, setGenreId] = useState(0);

  const classes = useStyles();

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=2eff1592c2104c03f9098af2aee54824&language=en-US`
    );

    setContent(data);
  };

  const fetchMovies = (e, id) => {
    setLoading(true);
    setGenreId(id);
    setMovies([]);
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=2eff1592c2104c03f9098af2aee54824&with_genres=${id}`
      )
      .then((response) => {
        setLoading(false);
        setMovies(response.data.results);
        setTotalResults(response.data.total_results);
        settotalPages(response.data.total_pages);
        console.log(response.data.results);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  //Test
  const nextPage = () => {
    setCurrentPage(currentPage + 1);

    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=2eff1592c2104c03f9098af2aee54824&with_genres=${genreId}&page=${currentPage}`
      )
      .then((response) => {
        setLoading(false);
        setMovies([...movies, ...response.data.results]);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  let mapping = movies
    ? movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id}></MovieCard>
      ))
    : null;

  let displayInfo = !loading ? (
    mapping
  ) : (
    <CircularProgress size="100px" thickness="5.6" />
  );

  const ReadGenres = (e, id) => {
    setPageText(e);
    window.history.replaceState(null, "new page title", `/genres/?genre=${e}`);
    fetchMovies(e, id);
  };

  return (
    <div>
      <div style={{ marginTop: 25 }}>
        {content &&
          content.genres.map((genre) => (
            <Chip
              className={classes.root}
              style={{ margin: 5 }}
              label={genre.name}
              key={genre.id}
              clickable
              size="large"
              onClick={() => ReadGenres(genre.name, genre.id)}
            />
          ))}
      </div>
      <div>
        {pageText ? (
          <h2 style={{ textAlign: "center" }}>
            {" "}
            <br /> {pageText}{" "}
          </h2>
        ) : null}
      </div>
      <div className={classes.displayMovies}>{displayInfo}</div>
      <div className={classes.button}>
        {totalresults > 20 && currentMovie == null ? (
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

const mapStateToProps = (state) => ({
  //   genres: state.movie.fetchGenre,
});

export default withRouter(connect(mapStateToProps, { fetchGenre })(GenresPage));
