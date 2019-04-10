import { SetSearchFiltersAction } from './SetSearchFilters';
import { SetSearchSortingAction } from './SetSearchSorting';
import { SetSearchTypeAction } from './SetSearchType';
import { AttemptSearchActions } from './Search';
import { FetchFiltersAction } from './FetchFilters';
import { UpdateRating } from './UpdateRating';

export type SearchAction = (
  SetSearchFiltersAction | SetSearchSortingAction | SetSearchTypeAction
  | AttemptSearchActions | FetchFiltersAction | UpdateRating
);

export * from './SetSearchFilters';
export * from './SetSearchSorting';
export * from './SetSearchType';
export * from './Search';
export * from './FetchFilters';
export * from './UpdateRating';
