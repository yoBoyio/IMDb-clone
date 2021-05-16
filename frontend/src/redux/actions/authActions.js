import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  COMMENT_SUCCESS,
  COMMENT_FAIL,
  DELETE_WATCHLIST,
  ADD_WATCHLIST,
  GET_WATCHLIST,
  FETCH_COMMENTS,
  COMMENT_LOADING,
  CHANGE_PASS,
  FETCH_COMMENTSTATS,
  FAILED_COMMENTS,
} from './types';
import { api } from '../../util/config'


//================WATCHLIST===================//

//get watchlist
export const getWatchlist = () => (dispatch, getState) => {
  axios
    .get("/api/users/watchlist/Get", tokenConfig())
    .then((res) =>
      dispatch({
        type: GET_WATCHLIST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
//add to watch list
export const addWatchlist = (token, movieId) => (dispatch, getState) => {
  const body = JSON.stringify({ movieId: movieId });

  axios
    .post("/api/users/watchlist/insert", body, conf(token))
    .then((res) =>
      dispatch({
        type: ADD_WATCHLIST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
//delete watclist
export const deleteWatchlist = (movieId) => (dispatch, getState) => {
  axios
    .delete("/api/users/watchlist/Remove", conf(movieId))
    .then((res) =>
      dispatch({
        type: DELETE_WATCHLIST,
        payload: movieId,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
//================USER===================//

// Check token and load user
export const loadUser = () => (dispatch) => {
  // User loading
  dispatch({ type: USER_LOADING });

  // Set user data and type
  axios
    .get("/api/Users/info", tokenConfig())
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    ) // Set errors
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};
// Register User
export const register = ({ name, email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("api/Users/signup", body, config)
    .then((res) => {
      setAuthorizationHeader(res.data[0].token);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      dispatch(getWatchlist());
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};
//Change Password
export const changePassword = (Password, newPassword) => (dispatch) => {
  // Request body
  const body = JSON.stringify({ Password, newPassword });

  axios
    .post("/api/Users/ChangePass", body, tokenConfig())
    .then((res) => {
      dispatch({
        type: CHANGE_PASS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: "PASSWORD_FAILED",
        payload: err.response.data,
      });
    });
};

// Login User
export const login = ({ email, password }) => (dispatch) => {
  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("api/Users/login", body, head)
    .then((res) => {
      setAuthorizationHeader(res.data[0].token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      dispatch(getWatchlist());
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

//====================RATING========================//

//comment
export const commentAction = (comment, movieId, like) => (dispatch) => {
  // Headers

  // Request body
  console.log(movieId)
  const id = parseInt(movieId)
  const body = JSON.stringify({
    movieId: id,
    commentContent: comment,
    like: true
  });

  axios
    .post(`https://localhost:44324/api/rating/insert`, body, conf())
    .then((res) => {
      dispatch({
        type: COMMENT_SUCCESS,
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "COMMENT_FAIL")
      );
      dispatch({
        type: COMMENT_FAIL,
      });
    });
};
// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const head = {
  headers: {
    "Content-type": "application/json",
  },
};

export const headAndData = (movieId) => {
  return {
    headers: {
      "Content-type": "application/json",
    },
    data: { movieId: movieId },
  };
};
// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = "bearer " + localStorage.getItem("token");

  // Headers
  const config = head;

  // If token, add to headers
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
};

export const conf = (movieId) => {
  // Get token from localstorage
  const token = "bearer " + localStorage.getItem("token");

  // Headers and data
  let config = null;
  // Headers
  if (movieId) {
    config = headAndData(movieId);
  } else {
    config = head;
  }
  // If token, add to headers
  if (token) {
    config.headers["Authorization"] = token;
  }

  return config;
};

const setAuthorizationHeader = (token) => {
  const authToken = `bearer ${token}`;
  localStorage.setItem("token", authToken);
};

export const FetchComments = (id) => (dispatch) => {
  axios
    .get(`https://localhost:44324/api/rating/get?movieId=${id}`)
    .then((response) =>
      dispatch({
        type: FETCH_COMMENTS,
        payload: response.data.Ratings
      })
    )
    .catch((err) => {
      dispatch({
        type: FAILED_COMMENTS,

      })
    });
};
export const FetchCommentStats = (id) => (dispatch) => {
  axios
    .get(
      `https://localhost:44324/api/rating/get/stats?movieId=${id}`
    )
    .then((response) =>
      dispatch({
        type: FETCH_COMMENTSTATS,
        payload: response.data
      })
    )
    .catch((err) => console.log(err));
};

export const CommentLoading = () => {
  return {
    type: COMMENT_LOADING,
  };
};
