import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import List from '../../Helpers/List';
import ListablePodcast from '../../Containers/ListablePodcast';
import ListableEpisode from '../../Containers/ListableEpisode';
import ListableUser from './ListableUser';
import Loader from '../Layout/Loader';
import { scrollToTop } from '../../Helpers/UserAgent';

function SearchResults({
  type, results, isSearching,
}) {
  let component;

  useEffect(() => {
    scrollToTop();
  }, [results]);

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

  const memoList = useMemo(() => <List component={component} data={results} />, [results]);

  return !isSearching
    ? memoList
    : <Loader />;
}

SearchResults.propTypes = {
  type: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(Immutable.Record).isRequired,
  isSearching: PropTypes.bool.isRequired,
};

export default SearchResults;
