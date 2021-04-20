import React from "react";
import { connect } from "react-redux";
import MovieCard from "../components/movies/MovieCard";
import { makeStyles } from "@material-ui/core/styles";

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
    maxHeight: "20",
  },
  test: {
    width: "20%",
    height: "10%",
  },
}));
function SearchPage(props) {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      {props.movies.map((movie) => (
        <div>
          <MovieCard
            movie={movie}
            key={movie.id}
            image={movie.poster_path}
          ></MovieCard>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  movies: state.movie.searchMovies,
});
export default connect(mapStateToProps)(SearchPage);
