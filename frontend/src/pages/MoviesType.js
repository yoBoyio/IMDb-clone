import React, { useContext, useEffect, useState } from "react";
import MovieCard from '../components/movies/MovieCard';
import { connect } from 'react-redux';
import '../components/styles/watchlist.css'
import axios from "axios";
import { getMovies } from '../redux/actions/movieActions';

export const MoviesType = ({ getMovies, movies, loading, location }) => {

    const movieurl = (location.pathname);
    const title = movieurl.slice(1, movieurl.length)
    //axios request with url param pathname
    useEffect(() => {
        getMovies(movieurl);
    }, [movieurl]);

    //display the response
    let display = (movies.length > 0 ? (
        <div className="movie-grid">
            {movies.map((movie) => (
                <MovieCard
                    movie={movie}
                    key={movie.id}
                ></MovieCard>
            ))}
        </div>
    ) : (null))

    return (
        <div className="movie-page">
            <h1 className='title'>{title}</h1>
            { display}
        </div>

    );
};

const mapStateToProps = (state) => ({
    loading: state.movie.loading,
    movies: state.movie.movies
});


export default connect(mapStateToProps, { getMovies })(MoviesType);