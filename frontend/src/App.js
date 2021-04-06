import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect } from 'react';

import styled from "styled-components";
import { Provider } from 'react-redux';
import { loadUser } from './redux/actions/authActions'
import AppNavbar from './components/AppNavbar'
import store from './store';
import { Container } from 'reactstrap';
import HomePage from './components/HomePage';
import StickyFooter from './components/StickyFooter';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginModal from './components/auth/LoginModal'
import RegisterModal from './components/auth/RegisterModal'
import AuthRoute from './util/AuthRoute'
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <AppNavbar />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <AuthRoute exact path="/login" component={LoginModal}
          />
          <AuthRoute exact path="/signup" component={RegisterModal}
          />
        </Switch>
        {/* <StickyFooter /> */}

      </Router>

    </Provider>
  );
}


export default App;
