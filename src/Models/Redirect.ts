import Immutable from 'immutable';

export interface RedirectModel {
  to: string | StringConstructor;
}

export const RedirectModel = Immutable.Record<RedirectModel>({
  to: String,
});
