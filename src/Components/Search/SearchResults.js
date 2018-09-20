import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import List from '../../Helpers/List';
import ListablePodcast from './ListablePodcast';
import ListableEpisode from '../../Containers/ListableEpisode';
import ListableUser from './ListableUser';
import Loader from '../Layout/Loader';

class SearchResults extends Component {
  shouldComponentUpdate(nextProps) {
    const { results, isSearching } = this.props;

    if (nextProps.results === results && nextProps.isSearching === isSearching) {
      return false;
    }

    return true;
  }

  render() {
    const { type, results, isSearching } = this.props;
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
  }
}

SearchResults.propTypes = {
  type: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(Immutable.Record).isRequired,
  isSearching: PropTypes.bool.isRequired,
};

export default SearchResults;
