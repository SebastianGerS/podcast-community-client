import { connect } from 'react-redux';
import PlaybackInterface from '../Components/Playback/PlaybackInterface';
import { togglePlaybackKModal } from '../Actions/Modal';
import { play, stop } from '../Actions/Player';


function mapStateToProps(state) {
  return {
    menuIsActive: state.Modal.menuIsActive,
    modalIsActive: state.Modal.playbackModalIsActive,
    episode: state.Player.episode,
    isPlaying: state.Player.isPlaying,
    startEpisode: state.Player.startEpisode,
    src: state.Player.src,
    height: state.Modal.height,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleModal: () => dispatch(togglePlaybackKModal()),
    play: () => dispatch(play()),
    stop: () => dispatch(stop()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaybackInterface);
