import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import Views from './Views';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <div className="App">
            <Header />
            <Views.Home />
          </div>
        )}
      />
      <Route
        path="/search"
        render={() => (
          <div className="App">
            <Header />
            <Views.Search />
          </div>
        )}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
