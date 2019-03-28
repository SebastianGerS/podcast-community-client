import { Record, List } from 'immutable';
import { Option } from './Option';

export interface Filters {
  genres: List<Option>;
  field: string | undefined;
  language: string | undefined;
  len_min: string | undefined;
  len_max: string | undefined;

}
export const Filters = Record<Filters>({
  genres: List(),
  field: undefined,
  language: undefined,
  len_min: '',
  len_max: '',
});
