import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import jwtDecode from "jwt-decode";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { loadUser } from "./redux/actions/authActions";
import { getWatchlist } from "./redux/actions/authActions";
import AppNavbar from "./components/navbar/AppNavbar";
import store from "./store";
import HomePage from "./pages/HomePage";
import StickyFooter from "./components/StickyFooter";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import AuthRoute from "./util/AuthRoute";
import MoviePage from "./pages/MoviePage";
import NotFound from "./pages/NotFound";
import Watchlist from "./pages/WatchlistPage";
import MoviesType from "./pages/MoviesType";
import Genrespage from "./pages/GenresPage";
import PopularPeoplePage from "./pages/PopularPeoplePage";
import PersonDetailsPage from "./pages/PersonDetailsPage";
import MyAccountPage from "./pages/MyAccountPage";
import LanguagePage from "./pages/LanguagePage";

const token = localStorage.getItem("token");
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    // store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch(loadUser());
    store.dispatch(getWatchlist());
  }
}
const App = () => {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  //   store.dispatch(getWatchlist());
  // }, []);

  return (
    <Provider store={store}>
      <Router>
        <AppNavbar />
        <div className="app">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/movie/:id" component={MoviePage} />
            <Route exact path="/TopRated" component={MoviesType} />
            <Route exact path="/Upcoming" component={MoviesType} />
            <Route exact path="/Latest" component={MoviesType} />
            <Route exact path="/watchlist" component={Watchlist} />
            <Route exact path="/genres" component={Genrespage} />
            <Route exact path="/languages" component={LanguagePage} />
            <Route exact path="/person" component={PopularPeoplePage} />
            <Route
              exact
              path="/person/:personId"
              component={PersonDetailsPage}
            />
            <Route exact path="/myaccount" component={MyAccountPage} />

            <AuthRoute exact path="/login" component={LoginPage} />
            <AuthRoute exact path="/signup" component={RegisterPage} />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
        <StickyFooter />
      </Router>
    </Provider>
  );
};

export default App;
