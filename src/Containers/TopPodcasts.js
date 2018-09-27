import { connect } from 'react-redux';
import TopPodcasts from '../Components/Podcasts/TopPodcasts';
import atemptGetTopPodcasts from '../Actions/Podcast';


function mapStateToProps(state) {
  return {
    topPodcasts: state.Podcast.topPodcasts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTopPodcasts: () => dispatch(atemptGetTopPodcasts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopPodcasts);
