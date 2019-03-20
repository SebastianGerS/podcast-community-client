import Immutable from 'immutable';
import { Podcast } from './Podcast';

export interface Category {
  _id: string | StringConstructor ;
  name: string | StringConstructor;
  podcasts: Podcast[] | ArrayConstructor;
}

export const Category = Immutable.Record<Category>({
  _id: String,
  name: String,
  podcasts: [new Podcast()],
});
