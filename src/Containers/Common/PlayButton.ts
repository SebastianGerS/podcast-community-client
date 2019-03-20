import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PlayButton from '../../Components/Common/PlayButton';
import {
  setAudio, stop, SetEpisode, StopPlayback,
} from '../../Actions/Player';
import { PlayerState } from '../../Reducers/PlayerReducer';
import { Episode } from '../../Models/Episode';
import { SetMessage } from '../../Actions/Message';

interface State {
  PlayerReducer: PlayerState;
}

interface StateProps {
  episodePlaying: Episode;
  isPlaying: boolean;
}

function mapStateToProps({ PlayerReducer }: State): StateProps {
  return {
    episodePlaying: PlayerReducer.episode,
    isPlaying: PlayerReducer.isPlaying,
  };
}

type ListableEpisodeAction = SetEpisode | StopPlayback | SetMessage;

interface DispatchProps {
  setAudio: (episode: Episode) => void;
  stop: () => void;
}

function mapDispatchToProps(dispatch: Dispatch<ListableEpisodeAction>): DispatchProps {
  return {
    setAudio: (episode: Episode) => setAudio(episode)(dispatch),
    stop: () => dispatch(stop()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);
