import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PodcastEpisode from '../../Components/Podcasts/PodcastEpisode';
import {
  setAudio, stop, download, DownloadActions, SetEpisode, StopPlayback,
} from '../../Actions/Player';
import { PlayerState } from '../../Reducers/PlayerReducer';
import { Episode } from '../../Models/Episode';
import { SetMessage } from '../../Actions/Message';

interface State {
  PlayerReducer: PlayerState;
}
interface StateProps {
  episode: Episode;
  isPlaying: boolean;
  isDownloading: string;
}

function mapStateToProps({ PlayerReducer }: State): StateProps {
  return {
    episode: PlayerReducer.episode,
    isPlaying: PlayerReducer.isPlaying,
    isDownloading: PlayerReducer.isDownloading,
  };
}
type ListableEpisodeAction = DownloadActions | SetEpisode | StopPlayback | SetMessage;

interface DispatchProps {
  setAudio: (episode: Episode) => void;
  stop: () => void;
  download: (episode: Episode) => void;
}

function mapDispatchToProps(dispatch: Dispatch<ListableEpisodeAction>): DispatchProps {
  return {
    setAudio: (episode: Episode) => setAudio(episode)(dispatch),
    stop: () => dispatch(stop()),
    download: (episode: Episode) => download(episode)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastEpisode);
