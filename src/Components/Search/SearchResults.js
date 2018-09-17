import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import List from '../../Helpers/List';
import ListablePodcast from './ListablePodcast';
import ListableEpisode from '../../Containers/ListableEpisode';
import ListableUser from './ListableUser';

class SearchResults extends Component {
  shouldComponentUpdate(nextProps) {
    const { results } = this.props;

    if (nextProps.results === results) {
      return false;
    }

    return true;
  }

  render() {
    let component;
    const { type, results } = this.props;

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

    return <List component={component} data={results} />;
  }
}
SearchResults.propTypes = {
  type: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(Immutable.Record).isRequired,
};

export default SearchResults;
