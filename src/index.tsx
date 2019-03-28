import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './Assets/Styles/index.css';
import Router from './Router';
import Store from './Store';

if (process.env.NODE_ENV === 'production') {
  const noop = (): void => undefined;
  // eslint-disable-next-line no-underscore-dangle
  const DEV_TOOLS = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (typeof DEV_TOOLS === 'object') {
  // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(DEV_TOOLS)) {
      DEV_TOOLS[key] = typeof value === 'function' ? noop : null;
    }
  }
}

ReactDOM.render(
  <Provider store={Store}>
    <Router />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
