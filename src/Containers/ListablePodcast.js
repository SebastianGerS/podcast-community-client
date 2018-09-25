import { connect } from 'react-redux';
import ListablePodcast from '../Components/Search/ListablePodcast';
import { atemptToggleSubscribtion } from '../Actions/Event';

function mapStateToProps(state) {
  return {
    isToggelingSubscription: state.Event.isToggelingSubscription,
    user: state.Auth.user,
    isLogedIn: state.Auth.isLogedIn,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    atemptToggleSubsription: (userId, podcastId) => dispatch(
      atemptToggleSubscribtion(userId, podcastId),
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListablePodcast);
