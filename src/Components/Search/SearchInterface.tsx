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
  sorting: string;
}
const SearchInterface = ({
  term, offset, type, search, morePages, isSearching, filters, sorting,
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
      sorting={sorting}
    />
  </div>
);

export default SearchInterface;
