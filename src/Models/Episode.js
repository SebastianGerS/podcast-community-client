import Immutable from 'immutable';

const Episode = Immutable.Record({
  description_original: String,
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
  itunes_id: Number,
});

export default Episode;
