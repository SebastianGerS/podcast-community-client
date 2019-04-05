import * as ActionTypes from './types';
import { Podcast } from '../../../Models/Podcast';

export interface SetPodcast {
  type: ActionTypes.SET_PODCAST;
  podcast: Podcast;
}

export const setPodcast = (podcast: Podcast): SetPodcast => ({
  type: ActionTypes.SET_PODCAST,
  podcast,
});
