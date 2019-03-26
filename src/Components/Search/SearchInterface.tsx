import React from 'react';
import SearchControlles from '../../Containers/Search/SearchControlles';
import SearchResluts from '../../Containers/Search/SearchResults';
import Pagination from '../Layout/Pagination';
import { Filters } from '../../Models/Filters';

interface Props {
  term: string;
  offset: number;
  type: string;
  search: () => Promise<void> ;
  morePages: boolean;
  isSearching: boolean;
  filters: Filters;
}
const SearchInterface = ({
  term, offset, type, search, morePages, isSearching, filters,
}: Props): JSX.Element => (
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
      filters={filters}
    />
  </div>
);

export default SearchInterface;
