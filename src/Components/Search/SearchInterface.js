import React from 'react';
import SearchControlles from '../../Containers/SearchControlles';
import SearchResluts from '../../Containers/SearchResults';
import Pagination from '../../Containers/Pagination';

const SearchInterface = () => (
  <div>
    <SearchControlles />
    <SearchResluts />
    <Pagination />
  </div>
);


export default SearchInterface;
