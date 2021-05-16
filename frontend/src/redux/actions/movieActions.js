import axios from "axios";
import {
  GENRES_MAP,
  SEARCH_MOVIES_LOADING,
  SEARCH_MOVIES,
  GET_MOVIES,
  MOVIES_LOADING,
  FETCH_MOVIE,
  LOADING,
  FETCH_CREDITS,
  FETCH_TRAILER,
  SEARCH_NOTFOUND,
} from "./types";
import { returnErrors } from "./errorActions";
import { api } from '../../util/config'
export const getMovies = (url, page) => (dispatch) => {
  dispatch(setMoviesLoading());
  axios
    .get(`https://localhost:44324/api/movieshowcase${url}`, Configparams(page))
    .then((res) => {
      dispatch({
        type: GET_MOVIES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const searchMovies = (url) => (dispatch) => {
  dispatch(setSearchMoviesLoading());
  axios
    .get(`https://localhost:44324/api/movieshowcase/Search/${url}`, config)
    .then((res) =>
      dispatch({
        type: SEARCH_MOVIES,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: SEARCH_NOTFOUND,
      });
    });
};

export const fetchMovie = (id) => (dispatch) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=2eff1592c2104c03f9098af2aee54824&&language=en-US`
    )
    .then((response) =>
      dispatch({
        type: FETCH_MOVIE,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err));
};

export const fetchGenre = () => (dispatch) => {
  axios
    .get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=2eff1592c2104c03f9098af2aee54824&&language=en-US`
    )
    .then((response) =>
      dispatch({
        type: GENRES_MAP,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err));
};

export const setMoviesLoading = () => {
  return {
    type: MOVIES_LOADING,
  };
};
export const setLoading = () => {
  return {
    type: LOADING,
  };
};
export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const Configparams = (page) => {
  return {
    headers: {
      "Content-Type": "application/json",
    },
    params: { page: page },
  };
};

export const setSearchMoviesLoading = () => {
  return {
    type: SEARCH_MOVIES_LOADING,
  };
};

export const fetchCredits = (id) => (dispatch) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=2eff1592c2104c03f9098af2aee54824&&language=en-US`
    )
    .then((response) =>
      dispatch({
        type: FETCH_CREDITS,
        payload: response.data.cast,
      })
    )
    .catch((err) => console.log(err));
};

export const fetchTrailer = (id) => (dispatch) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=2eff1592c2104c03f9098af2aee54824&&language=en-US`
    )
    .then((response) =>
      dispatch({
        type: FETCH_TRAILER,
        payload: response.data.results,
      })
    )
    .catch((err) => console.log(err));
};
