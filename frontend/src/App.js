import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { loadUser } from "./redux/actions/authActions";
import { getWatchlist } from "./redux/actions/movieActions";
import AppNavbar from "./components/navbar/AppNavbar";
import store from "./store";
import HomePage from "./pages/HomePage";
import StickyFooter from "./components/StickyFooter";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import AuthRoute from "./util/AuthRoute";
import Movie from "./components/movies/Movie";
import MoviePage from "./pages/MoviePage";
import NotFound from "./pages/NotFound";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getWatchlist());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <AppNavbar />
        <div className="app">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/movie/:id" component={MoviePage} />
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
