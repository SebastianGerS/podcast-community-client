import { Record } from 'immutable';

export interface Option {
  name: string | undefined;
  value: string | number | undefined;
}

export const Option = Record<Option>({
  name: undefined,
  value: undefined,
});
