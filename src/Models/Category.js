import Immutable from 'immutable';
import Podcast from './Podcast';

const Category = Immutable.Record({
  _id: String,
  name: String,
  podcasts: [Podcast],
});

export default Category;
