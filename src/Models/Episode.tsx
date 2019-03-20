import Immutable from 'immutable';

export interface Episode {
  description_original: string | StringConstructor;
  podcast_listennotes_url: string | StringConstructor;
  podcast_title_original: string | StringConstructor;
  rss: string | StringConstructor;
  audio_length: string | StringConstructor;
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
  itunes_id: number | NumberConstructor;
}

export const Episode = Immutable.Record<Episode>({
  description_original: String,
  podcast_listennotes_url: String,
  podcast_title_original: String,
  rss: String,
  audio_length: String,
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
  itunes_id: Number,
});
