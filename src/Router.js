import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import PlaybackCenter from './Components/PlaybackCenter';
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
            <SearchBar />
            <Views.Home />
            <PlaybackCenter />
          </div>
        )}
      />
      <Route
        path="/search"
        render={() => (
          <div className="App">
            <Header />
            <SearchBar />
            <Views.Search />
            <PlaybackCenter />
          </div>
        )}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
