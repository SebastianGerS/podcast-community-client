import { Dispatch } from 'redux';
import downloadjs from 'downloadjs';
import * as ActionTypes from './types';
import { setMessage, SetMessage } from '../Message';
import { saveToListOfDownloads } from '../../Helpers/Downloads';
import Config from '../../Config/config';
import { Episode } from '../../Models/Episode';

export interface StartPlayback {
  type: ActionTypes.START_PLAYBACK;
}

export const play = (): StartPlayback => ({
  type: ActionTypes.START_PLAYBACK,
});

export interface StopPlayback {
  type: ActionTypes.STOP_PLAYBACK;
}

export const stop = (): StopPlayback => ({
  type: ActionTypes.STOP_PLAYBACK,
});

export interface SetEpisode {
  type: ActionTypes.SET_EPISODE;
  episode: Episode;
  src: string;
}

export const selectEpisode = (episode: Episode, src: string): SetEpisode => ({
  type: ActionTypes.SET_EPISODE,
  episode,
  src,
});

type SetAudioAction = (dispatch: Dispatch<SetEpisode>) => void;

export const setAudio = (episode: Episode): SetAudioAction => (
  dispatch: Dispatch<SetEpisode>,
): void => {
  const src = `${Config.API_BASE_URL}/audio/${episode.id}`;
  dispatch(selectEpisode(episode, src));
};

interface DownloadEpisodeStart {
  type: ActionTypes.DOWNLOAD_EPISODE_START;
  episodeId: string;
}

export const startDownloading = (episodeId: string): DownloadEpisodeStart => ({
  type: ActionTypes.DOWNLOAD_EPISODE_START,
  episodeId,
});

interface DownloadEpisodeSuccess {
  type: ActionTypes.DOWNLOAD_EPISODE_SUCCESS;
}

export const downloaded = (): DownloadEpisodeSuccess => ({
  type: ActionTypes.DOWNLOAD_EPISODE_SUCCESS,
});

interface DownloadEpisodeFailure {
  type: ActionTypes.DOWNLOAD_EPISODE_FAILURE;
}

export const failedDownload = (): DownloadEpisodeFailure => ({
  type: ActionTypes.DOWNLOAD_EPISODE_FAILURE,
});

export type DownloadActions = DownloadEpisodeStart | DownloadEpisodeSuccess | DownloadEpisodeFailure;

type DownloadAction = (dispatch: Dispatch<DownloadActions | SetMessage>) => void;

export const download = (episode: Episode): DownloadAction => (
  dispatch: Dispatch<DownloadActions | SetMessage>,
): void => {
  if (typeof episode.id === 'string') {
    dispatch(startDownloading(episode.id));
    caches.open('thru-the-ether').then(async (cache) => {
      const path = `${Config.API_BASE_URL}/audio/${episode.id}`;

      await fetch(path)
        .then(async (res) => {
          cache.put(path, res.clone());
          const blob = await res.blob();
          downloadjs(blob, `${episode.title_original}.mp3`, 'application/octet-stream');
          if (typeof episode.id === 'string') saveToListOfDownloads(episode.id);
          dispatch(downloaded());
        }).catch(() => {
          dispatch(failedDownload());
          dispatch(setMessage({ text: 'failed to download the episode', type: 'error' }));
        });
    });
  }
};

export type PlayerActions = StartPlayback | StopPlayback | SetEpisode | DownloadActions;
