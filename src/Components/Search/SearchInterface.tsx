import React from 'react';
import SearchControlles from '../../Containers/SearchControlles';
import SearchResluts from '../../Containers/SearchResults';
import Pagination from '../Layout/Pagination';

interface Props {
  term: string;
  offset: number;
  type: string;
  search: () => Promise<void> ;
  morePages: boolean;
  isSearching: boolean;
}
const SearchInterface = ({
  term, offset, type, search, morePages, isSearching,
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
    />
  </div>
);

export default SearchInterface;
