import Immutable from 'immutable';

export interface Episode {
  description_original: string | StringConstructor;
  description: string | StringConstructor;
  publisher_highlighted: string | StringConstructor;
  podcast_listennotes_url: string | StringConstructor;
  description_highlighted: string | StringConstructor;
  podcast_title_original: string | StringConstructor;
  transcripts_highlighted: string[] | ArrayConstructor;
  rss: string | StringConstructor;
  audio_length: string | StringConstructor;
  pub_date_ms: number | NumberConstructor;
  thumbnail: string | StringConstructor;
  listennotes_url: string | StringConstructor;
  podcast_title_highlighted: string | StringConstructor;
  image: string | StringConstructor;
  publisher_original: string | StringConstructor;
  genres: string[] | ArrayConstructor;
  title_highlighted: string | StringConstructor;
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
  publisher_highlighted: String,
  podcast_listennotes_url: String,
  description_highlighted: String,
  podcast_title_original: String,
  transcripts_highlighted: Array,
  rss: String,
  audio_length: String,
  pub_date_ms: Number,
  thumbnail: String,
  listennotes_url: String,
  podcast_title_highlighted: String,
  image: String,
  publisher_original: String,
  genres: Array,
  title_highlighted: String,
  podcast_id: String,
  audio: String,
  id: String,
  title_original: String,
  title: String,
  itunes_id: Number,
});
