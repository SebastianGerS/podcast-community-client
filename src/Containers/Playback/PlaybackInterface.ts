import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PlaybackInterface from '../../Components/Playback/PlaybackInterface';
import { togglePlaybackKModal, TogglePlaybackModal } from '../../Actions/Modal';
import {
  play,
  stop,
  StartPlayback,
  StopPlayback,
} from '../../Actions/Player';
import { ModalState } from '../../Reducers/ModalReducer';
import { PlayerState } from '../../Reducers/PlayerReducer';
import { Episode } from '../../Models/Episode';
import { AuthState } from '../../Reducers/AuthReducer';

interface State {
  ModalReducer: ModalState;
  PlayerReducer: PlayerState;
  AuthReducer: AuthState;
}

interface StateProps {
  menuIsActive: boolean;
  modalIsActive: boolean;
  episode: Episode;
  isPlaying: boolean;
  startEpisode: boolean;
  src: string;
  height: number;
  userId: string | StringConstructor;
  socket: any;
}

function mapStateToProps({ ModalReducer, PlayerReducer, AuthReducer }: State): StateProps {
  return {
    menuIsActive: ModalReducer.menuIsActive,
    modalIsActive: ModalReducer.playbackModalIsActive,
    episode: PlayerReducer.episode,
    isPlaying: PlayerReducer.isPlaying,
    startEpisode: PlayerReducer.startEpisode,
    src: PlayerReducer.src,
    height: ModalReducer.height,
    userId: AuthReducer.user._id,
    socket: AuthReducer.socket,
  };
}

interface DispatchProps {
  toggleModal: () => void;
  play: () => void;
  stop: () => void;
}

type PlaybackInterfaceActions = StartPlayback | StopPlayback | TogglePlaybackModal;

function mapDispatchToProps(dispatch: Dispatch<PlaybackInterfaceActions>): DispatchProps {
  return {
    toggleModal: () => dispatch(togglePlaybackKModal()),
    play: () => dispatch(play()),
    stop: () => dispatch(stop()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaybackInterface);
