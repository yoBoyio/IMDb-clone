import axios from 'axios';
import { GET_WATCHLIST, GENRES_MAP, SEARCH_MOVIES_LOADING, SEARCH_MOVIES, GET_MOVIES, DELETE_WATCHLIST, ADD_WATCHLIST, MOVIES_LOADING, FETCH_MOVIE, LOADING,FETCH_CREDITS,FETCH_TRAILER } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


export const getMovies = (url) => (dispatch) => {
  dispatch(setMoviesLoading());

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

  axios
    .get(`api/movieshowcase/Search/${url}`, config)
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

export const getWatchlist = () => (
  dispatch,
  getState
) => {
  axios
    .get('/api/users/watchlist/Get', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_WATCHLIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addWatchlist = (movieId) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ movieId: movieId });

  axios
    .post('/api/users/watchlist/Insert', body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_WATCHLIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteWatchlist = (id) => (
  dispatch,
  getState
) => {
  axios
    .post(`/api/watchlist/Remove`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_WATCHLIST,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const fetchGenre = () => dispatch => {

  axios
    .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=2eff1592c2104c03f9098af2aee54824&&language=en-US`)
    .then(response =>
      dispatch({
        type: GENRES_MAP,
        payload: response.data
      })
    )
    .catch(err => console.log(err));
}

export const setMoviesLoading = () => {
  return {
    type: MOVIES_LOADING
  };
};

export const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
export const setSearchMoviesLoading = () => {
  return {
    type: SEARCH_MOVIES_LOADING
  };
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


export const setLoading = () => {
  return {
    type: LOADING
  };
};

export const fetchCredits = id => dispatch => {
  axios
    .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=2eff1592c2104c03f9098af2aee54824&&language=en-US`)
    .then(response =>
      dispatch({
        type: FETCH_CREDITS,
        payload: response.data.cast
      })
    )
    .catch(err => console.log(err));
};

export const fetchTrailer = id => dispatch => {
  axios
    .get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=2eff1592c2104c03f9098af2aee54824&&language=en-US`)
    .then(response =>
      dispatch({
        type: FETCH_TRAILER,
        payload: response.data.results
      })
    )
    .catch(err => console.log(err));
};


