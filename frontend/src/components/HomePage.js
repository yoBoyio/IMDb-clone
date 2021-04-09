import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovies, deleteMovie } from '../redux/actions/movieActions';
import MovieCard from './MovieCard';
import './styles/HomePage.css';
import Row from './homepage/Row'

const MovieList = ({
  getMovies,
  movie,
  isAuthenticated,
  deleteMovies
}) => {
  useEffect(() => {
    getMovies('latest?page=1');
  }, [getMovies]);

  const handleDelete = (id) => {
    deleteMovie(id);
  };

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
        url={'Upcomming'}
        isLargeRow
      />
      <Row
        title="Top Rated"
        url={'TopRated'}
        isLargeRow
      />
      {movies.length > 0 && movies.map((movieMap) =>
        <MovieCard movie={movieMap} key={movieMap.Id} />
      )}
    </div>

  );
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getMovies, deleteMovie })(MovieList);