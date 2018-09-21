import { connect } from 'react-redux';
import ListablePodcast from '../Components/Search/ListablePodcast';
import { atemptToggleSubscribtion } from '../Actions/Event';

function mapStateToProps(state) {
  return {
    isToggelingSubscription: state.Event.isToggelingSubscription,
    subscriptions: state.Auth.user.subscriptions,
    isLogedIn: state.Auth.isLogedIn,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    atemptToggleSubsription: podcastId => dispatch(atemptToggleSubscribtion(podcastId)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListablePodcast);
