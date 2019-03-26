import { SetSearchFiltersAction } from './SetSearchFilters';
import { SetSearchSortByAction } from './SetSearchSortBy';
import { SetSearchTypeAction } from './SetSearchType';
import { AttemptSearchActions } from './Search';
import { FetchFiltersAction } from './FetchFilters';

export type SearchAction = (
  SetSearchFiltersAction | SetSearchSortByAction | SetSearchTypeAction | AttemptSearchActions | FetchFiltersAction
);

export * from './SetSearchFilters';
export * from './SetSearchSortBy';
export * from './SetSearchType';
export * from './Search';
export * from './FetchFilters';
