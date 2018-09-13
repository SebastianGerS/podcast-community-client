import { connect } from 'react-redux';
import PlaybackInterface from '../Components/Playback/PlaybackInterface';
import { togglePlaybackKModal } from '../Actions/Modal';

function mapStateToProps(state) {
  return {
    menuIsActive: state.Modal.menuIsActive,
    modalIsActive: state.Modal.playbackModalIsActive,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleModal: () => dispatch(togglePlaybackKModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaybackInterface);
