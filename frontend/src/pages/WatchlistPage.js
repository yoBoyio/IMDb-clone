import React, { useContext, useEffect } from "react";
import MovieCard from "../components/movies/MovieCard";
import { connect } from "react-redux";
import "../components/styles/watchlist.css";
export const Watchlist = ({ watchlist, isAuthenticated }) => {
  const notlogged = !isAuthenticated ? (
    <h2 className="no-movies">Not a member</h2>
  ) : null;

  return (
    <div className="movie-page">
      <div className="header">
        <h1 className="heading">My Watchlist</h1>

        <span className="count-pill">
          {watchlist.length} {watchlist.length === 1 ? "Movie" : "Movies"}
        </span>
      </div>

      {isAuthenticated && watchlist.length > 0 ? (
        <div className="movie-grid">
          {watchlist.map((movie) =>
            movie.id !== 0 ? (
              <MovieCard movie={movie} key={movie.id} type="watchlist" />
            ) : null
          )}
        </div>
      ) : null}

      {isAuthenticated && watchlist == 0 ? (
        <h2 className="no-movies">
          <br></br>No movies in your list! Add some!
        </h2>
      ) : null}
      {notlogged}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.isLoading,
  watchlist: state.movie.watchlist,
});

export default connect(mapStateToProps, null)(Watchlist);
