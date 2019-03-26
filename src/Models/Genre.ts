import { Record } from 'immutable';
import { Option } from './Option';

export interface Genre extends Option{
  value: number | undefined;
}

export const Genre = Record<Genre>({
  name: undefined,
  value: undefined,
});
