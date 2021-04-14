import axios from 'axios';
import { SEARCH_MOVIES_LOADING, SEARCH_MOVIES, GET_MOVIES, DELETE_MOVIE, ADD_MOVIE, MOVIES_LOADING, FETCH_MOVIE, LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


export const getMovies = (url) => (dispatch) => {
  dispatch(setMoviesLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios
    .get(`api/movieshowcase/${url}/page=1`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res =>

      dispatch({
        type: GET_MOVIES,
        payload: res.data

      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const searchMovies = (url) => (dispatch) => {
  dispatch(setSearchMoviesLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios
    .get(`api/movieshowcase/${url}/page=1`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res =>
      dispatch({
        type: SEARCH_MOVIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addmovie = (movie) => (
  dispatch,
  getState
) => {
  axios
    .post('/api/movies', movie, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_MOVIE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteMovie = (id) => (
  dispatch,
  getState
) => {
  axios
    .delete(`/api/movies/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_MOVIE,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};


export const fetchMovie = id => dispatch => {
  axios
    .get(`https://api.themoviedb.org/3/movie/${id}?api_key=2eff1592c2104c03f9098af2aee54824&&language=en-US`)
    .then(response =>
      dispatch({
        type: FETCH_MOVIE,
        payload: response.data
      })
    )
    .catch(err => console.log(err));
};

export const setMoviesLoading = () => {
  return {
    type: MOVIES_LOADING
  };
};
export const setLoading = () => {
  return {
    type: LOADING
  };
};

export const setSearchMoviesLoading = () => {
  return {
    type: SEARCH_MOVIES_LOADING
  };
};