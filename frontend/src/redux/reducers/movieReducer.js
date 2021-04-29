import {
  GET_MOVIES,
  MOVIES_LOADING,
  FETCH_MOVIE,
  LOADING,
  FETCH_CREDITS,
  FETCH_TRAILER,
  SEARCH_MOVIES,
  SEARCH_MOVIES_LOADING,
  GENRES_MAP,
  DELETE_WATCHLIST,
  ADD_WATCHLIST,
  GET_WATCHLIST,
  SEARCH_NOTFOUND,
} from "../actions/types";

const initialState = {
  movies: [],
  loading: false,
  searchLoading: false,
  watchlistSucces: false,
  text: "",
  movie: [],
  credits: [],
  trailer: [],
  searchMovies: [],
  genres: [],
  watchlist: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        // movies: action.payload,
        movies: action.payload,
        loading: false,
      };
    case GET_WATCHLIST:
      return {
        ...state,
        // movies: action.payload,
        watchlist: action.payload,
        loading: false,
      };
    case DELETE_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload
        ),
        loading: false,
        watchlistSucces: true,
      };
    case ADD_WATCHLIST:
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
        watchlistSucces: true,
        loading: false,
      };
    case MOVIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_NOTFOUND:
      return {
        ...state,
        searchLoading: false,
        searchMovies: [],
      };
    case SEARCH_MOVIES_LOADING:
      return {
        ...state,
        searchLoading: true,
      };
    case SEARCH_MOVIES:
      return {
        ...state,
        searchMovies: action.payload,
        searchLoading: false,
      };
    case GENRES_MAP:
      return {
        ...state,
        genres: action.payload,
      };
    case FETCH_MOVIE:
      return {
        ...state,
        movie: action.payload,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CREDITS:
      return {
        ...state,
        credits: action.payload,
        loading: false,
      };
    case FETCH_TRAILER:
      return {
        ...state,
        trailer: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
