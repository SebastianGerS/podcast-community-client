import React from 'react';
import PropTypes from 'prop-types';
import List from '../../Helpers/List';
import ListablePodcast from '../Podcasts/ListablePodcast';
import ListableEpisode from './ListableEpisode';
import ListableUser from './ListableUser';

const SearchResults = ({ type, results }) => {
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

  return results ? (<List component={component} data={results} />) : null;
};
SearchResults.propTypes = {
  type: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default SearchResults;
