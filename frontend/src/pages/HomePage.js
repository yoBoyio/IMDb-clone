import React from 'react';
import { connect } from 'react-redux';
import '../components/styles/HomePage.css';
import Row from '../components/movies/Row'

const MovieList = ({
  getMovies,
  movie,
  isAuthenticated,
  deleteMovies
}) => {

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