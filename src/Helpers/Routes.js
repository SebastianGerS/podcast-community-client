import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import PlaybackCenter from '../Components/PlaybackCenter';
import Footer from '../Components/Footer';

const SiteRoute = ({ component: Component, path, ...rest }) => (
  <Route
    path={path}
    {...rest}
    render={props => (
      <div className="App">
        <Header />
        <SearchBar />
        <div className="content">
          <h2 className="page-header">{path === '/' ? 'Home' : `${path.charAt(1).toUpperCase()}${path.slice(2)}`}</h2>
          <Component {...props} />
        </div>
        <Footer />
        <PlaybackCenter />
      </div>
    )}
  />
);

export default SiteRoute;
