import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { loadUser } from './redux/actions/authActions'
import AppNavbar from './components/navbar/AppNavbar'
import store from './store';
import HomePage from './pages/HomePage';
import StickyFooter from './components/StickyFooter';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AuthRoute from './util/AuthRoute'
import Movie from './components/movies/Movie';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <AppNavbar />
        <div className="app">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/movie/:id" component={Movie} />
            <AuthRoute exact path="/login" component={LoginPage}

            />
            <AuthRoute exact path="/signup" component={RegisterPage}
            />
          </Switch>
        </div>
        <StickyFooter />

      </Router>

    </Provider>
  );
}


export default App;