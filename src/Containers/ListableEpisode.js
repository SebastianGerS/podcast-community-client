import { connect } from 'react-redux';
import ListableEpisode from '../Components/Search/ListableEpisode';
import { setAudio, stop } from '../Actions/Player';

function mapStateToProps(state) {
  return {
    episode: state.Player.episode,
    isPlaying: state.Player.isPlaying,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setAudio: episode => dispatch(setAudio(episode)),
    stop: () => dispatch(stop()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListableEpisode);
