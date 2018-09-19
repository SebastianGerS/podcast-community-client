import { connect } from 'react-redux';
import ListableEpisode from '../Components/Search/ListableEpisode';
import { setAudio, stop, download } from '../Actions/Player';

function mapStateToProps(state) {
  return {
    episode: state.Player.episode,
    isPlaying: state.Player.isPlaying,
    isDownloading: state.Player.isDownloading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setAudio: episode => dispatch(setAudio(episode)),
    stop: () => dispatch(stop()),
    download: episode => dispatch(download(episode)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListableEpisode);
