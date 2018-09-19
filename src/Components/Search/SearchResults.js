import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import List from '../../Helpers/List';
import ListablePodcast from './ListablePodcast';
import ListableEpisode from '../../Containers/ListableEpisode';
import ListableUser from './ListableUser';
import Loader from '../Layout/Loader';

const SearchResults = ({ type, results, isSearching }) => {
  let component;

  switch (type) {
    case 'podcast':
      component = ListablePodcast;
      break;
    case 'episode':
      component = ListableEpisode;
      break;
    case 'user':
      component = ListableUser;
      break;
    default:
      break;
  }

  return !isSearching
    ? <List component={component} data={results} />
    : <Loader />;
};

SearchResults.propTypes = {
  type: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(Immutable.Record).isRequired,
  isSearching: PropTypes.bool.isRequired,
};

export default SearchResults;
