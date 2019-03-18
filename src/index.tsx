import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './Assets/Styles/index.css';
import Router from './Router';
import Store from './Store';

ReactDOM.render(
  <Provider store={Store}>
    <Router />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
