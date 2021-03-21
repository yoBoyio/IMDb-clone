import axios from 'axios';
import { GET_MOVIES, ADD_MOVIES, MOVIES,_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


export const getMovies = () => (dispatch) => {
  dispatch(setMoviesLoading());
  axios
    .get('/api/movies')
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

export const setMoviesLoading = () => {
  return {
    type: MOVIES_LOADING
  };
};