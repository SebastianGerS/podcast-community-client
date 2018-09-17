import { connect } from 'react-redux';
import ListableEpisode from '../Components/Search/ListableEpisode';
import { selectEpisode, stop } from '../Actions/Player';

function mapStateToProps(state) {
  return {
    episode: state.Player.episode,
    isPlaying: state.Player.isPlaying,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    selectEpisode: episode => dispatch(selectEpisode(episode)),
    stop: () => dispatch(stop()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListableEpisode);
