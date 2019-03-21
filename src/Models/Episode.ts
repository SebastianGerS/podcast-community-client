import Immutable from 'immutable';

export interface Episode {
  description_original: string | StringConstructor;
  description: string | StringConstructor;
  podcast_listennotes_url: string | StringConstructor;
  podcast_title_original: string | StringConstructor;
  rss: string | StringConstructor;
  audio_length: string | number | StringConstructor | NumberConstructor;
  pub_date_ms: number | NumberConstructor;
  thumbnail: string | StringConstructor;
  listennotes_url: string | StringConstructor;
  image: string | StringConstructor;
  publisher_original: string | StringConstructor;
  genres: string[] | ArrayConstructor;
  podcast_id: string | StringConstructor;
  audio: string | StringConstructor;
  id: string | StringConstructor;
  title_original: string | StringConstructor;
  title: string | StringConstructor;
  itunes_id: number | NumberConstructor;
}

export const Episode = Immutable.Record<Episode>({
  description_original: String,
  description: String,
  podcast_listennotes_url: String,
  podcast_title_original: String,
  rss: String,
  audio_length: String || Number,
  pub_date_ms: Number,
  thumbnail: String,
  listennotes_url: String,
  image: String,
  publisher_original: String,
  genres: Array,
  podcast_id: String,
  audio: String,
  id: String,
  title_original: String,
  title: String,
  itunes_id: Number,
});
