import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MovieCard from '../components/movies/MovieCard';
import '../components/styles/HomePage.css';
import Row from '../components/movies/Row'

const MovieList = ({
  getMovies,
  movie,
  isAuthenticated,
  deleteMovies
}) => {
  // useEffect(() => {
  //   getMovies('latest?page=1');
  // }, [getMovies]);

  // const handleDelete = (id) => {
  //   addWatchlist(id);
  // };

  const { movies } = movie;
  return (

    <div className="movie-container">
      <Row
        title="Latest"
        url={'Latest'}
        isLargeRow
      />
      <Row
        title="Upcoming"
        url={'Upcoming'}
        isLargeRow
      />
      <Row
        title="Top Rated"
        url={'TopRated'}
        isLargeRow
      />

    </div>

  );
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(MovieList);