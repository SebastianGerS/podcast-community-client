import { SetSearchFiltersAction } from './SetSearchFilters';
import { SetSearchSortingAction } from './SetSearchSorting';
import { SetSearchTypeAction } from './SetSearchType';
import { AttemptSearchActions } from './Search';
import { FetchFiltersAction } from './FetchFilters';

export type SearchAction = (
  SetSearchFiltersAction | SetSearchSortingAction | SetSearchTypeAction | AttemptSearchActions | FetchFiltersAction
);

export * from './SetSearchFilters';
export * from './SetSearchSorting';
export * from './SetSearchType';
export * from './Search';
export * from './FetchFilters';
