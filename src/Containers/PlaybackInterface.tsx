import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PlaybackInterface from '../Components/Playback/PlaybackInterface';
import { togglePlaybackKModal, TogglePlaybackModal } from '../Actions/Modal';
import {
  play,
  stop,
  StartPlayback,
  StopPlayback,
} from '../Actions/Player';
import { ModalState } from '../Reducers/ModalReducer';
import { PlayerState } from '../Reducers/PlayerReducer';
import { Episode } from '../Models/Episode';

interface State {
  ModalReducer: ModalState;
  PlayerReducer: PlayerState;
}

interface StateProps {
  menuIsActive: boolean;
  modalIsActive: boolean;
  episode: Episode;
  isPlaying: boolean;
  startEpisode: boolean;
  src: string;
  height: number;
}

function mapStateToProps({ ModalReducer, PlayerReducer }: State): StateProps {
  return {
    menuIsActive: ModalReducer.menuIsActive,
    modalIsActive: ModalReducer.playbackModalIsActive,
    episode: PlayerReducer.episode,
    isPlaying: PlayerReducer.isPlaying,
    startEpisode: PlayerReducer.startEpisode,
    src: PlayerReducer.src,
    height: ModalReducer.height,
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
