import * as ActionTypes from './types';
import { Episode } from '../../../Models/Episode';

export interface SetEpisode {
  type: ActionTypes.SET_EPISODE;
  episode: Episode;
}

export const setEpisode = (episode: Episode): SetEpisode => ({
  type: ActionTypes.SET_EPISODE,
  episode,
});
