import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom'
import {createBrowserHistory} from 'history'

import {Provider} from "react-redux";
import getStore from "./storage/init";
import { PersistGate } from 'redux-persist/integration/react'
import { createStore } from 'redux'
import LoadingScreen from "react-loading-screen";

const { store, persistor } = getStore()
const history = createBrowserHistory()


ReactDOM.render(
  <React.Fragment>
  <Provider store={store}>
  <PersistGate loading={<LoadingScreen
      loading={true}
      bgColor='#000'
      spinnerColor='#FFF'
      textColor='#FFF'
      text='Загрузка игровых данных' >
    children
  </LoadingScreen>
  } persistor={persistor}>
  <Router history={history}>
    <App />
  </Router>
  </PersistGate>
  </Provider>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();