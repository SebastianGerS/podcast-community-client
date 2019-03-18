import Immutable from 'immutable';

export interface Podcast {
  description: string | StringConstructor;
  description_original: string | StringConstructor;
  publisher: string | StringConstructor;
  publisher_highlighted: string | StringConstructor;
  lastest_pub_date_ms: number | NumberConstructor;
  description_highlighted: string | StringConstructor;
  rss: string | StringConstructor;
  thumbnail: string | StringConstructor;
  image: string | StringConstructor;
  publisher_original: string | StringConstructor;
  listennotes_url: string | StringConstructor;
  title_highlighted: string | StringConstructor;
  genres: string[] | ArrayConstructor;
  title: string | StringConstructor;
  title_original: string | StringConstructor;
  id: string | StringConstructor;
  itunes_id: number | NumberConstructor;
}

export const Podcast = Immutable.Record<Podcast>({
  description: String,
  description_original: String,
  publisher: String,
  publisher_highlighted: String,
  lastest_pub_date_ms: Number,
  description_highlighted: String,
  rss: String,
  thumbnail: String,
  image: String,
  publisher_original: String,
  listennotes_url: String,
  title_highlighted: String,
  genres: Array,
  title: String,
  title_original: String,
  id: String,
  itunes_id: Number,
});
