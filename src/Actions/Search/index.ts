import { SetSearchFiltersAction } from './SetSearchFilters';
import { SetSearchSortingAction } from './SetSearchSorting';
import { SetSearchTypeAction } from './SetSearchType';
import { AttemptSearchActions } from './Search';
import { FetchFiltersAction } from './FetchFilters';
import { UpdateUserSearchResults } from './UpdateUserSearchResults';

export type SearchAction = (
  SetSearchFiltersAction | SetSearchSortingAction | SetSearchTypeAction
  | AttemptSearchActions | FetchFiltersAction | UpdateUserSearchResults
);

export * from './SetSearchFilters';
export * from './SetSearchSorting';
export * from './SetSearchType';
export * from './Search';
export * from './FetchFilters';
export * from './UpdateUserSearchResults';
