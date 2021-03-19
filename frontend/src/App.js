import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect } from 'react';

import styled from "styled-components";
import {Provider} from 'react-redux';
import {loadUser} from './redux/actions/authActions'
import AppNavbar from './components/AppNavbar'
import store from './store';


const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  
  return (
    <Provider store={store}>
     <div className="App">
      <AppNavbar />
     </div>
    </Provider>
  );
}


export default App;
