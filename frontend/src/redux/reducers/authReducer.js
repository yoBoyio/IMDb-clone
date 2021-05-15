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
  FETCH_COMMENTS,
  COMMENT_LOADING,
  CHANGE_PASS,
  PASSWORD_FAILED,
  FETCH_COMMENTSTATS,
  FAILED_COMMENTS,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  commentSuccess: null,
  showComments: [],
  loading: false,
  change_password: null,
  commentStats: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    //check if user is auth for every request
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    //set token for auth user
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload[0].token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    //set token, user to null and clear types on state
    case PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        change_password: action.payload,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case COMMENT_SUCCESS:
      return {
        ...state,
        commentSuccess: true,
        isLoading: false,
      };
    case COMMENT_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_COMMENTS:
      return {
        ...state,
        showComments: action.payload,
        loading: false,
      };
    case FAILED_COMMENTS:
      return {
        ...state,
        showComments: [],
        loading: false,
      };

    case COMMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_PASS:
      return {
        ...state,
        loading: false,
        change_password: action.payload,
      };
    case FETCH_COMMENTSTATS:
      return {
        ...state,
        loading: true,
      }
    default:
      return state;
  }
}
