import React from 'react';
import PropTypes from 'prop-types';
import SearchControlles from '../../Containers/SearchControlles';
import SearchResluts from '../../Containers/SearchResults';
import Pagination from '../Layout/Pagination';

const SearchInterface = ({
  term, offset, type, search, morePages, isSearching,
}) => (
  <div>
    <SearchControlles />
    <SearchResluts />
    <Pagination
      term={term}
      offset={offset}
      type={type}
      search={search}
      morePages={morePages}
      isSearching={isSearching}
    />
  </div>
);
SearchInterface.propTypes = {
  term: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  morePages: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
};

export default SearchInterface;
