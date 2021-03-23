import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect } from 'react';

import styled from "styled-components";
import {Provider} from 'react-redux';
import {loadUser} from './redux/actions/authActions'
import AppNavbar from './components/AppNavbar'
import store from './store';
import { Container } from 'reactstrap';
import HomePage from './components/HomePage';



const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
    <Provider store={store}>
      <AppNavbar />
      <HomePage /> 
    </Provider>
  );
}


export default App;
