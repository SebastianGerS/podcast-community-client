import { connect } from 'react-redux';
import MySubscriptions from '../Components/Subscription/MySubscriptions';
import { atemptGetSubscriptions } from '../Actions/User';

function mapStateToProps(state) {
  return {
    isFetchingSubscriptions: state.User.isFetchingSubscriptions,
    subscriptions: state.User.subscriptions,
    categories: state.User.categories,
    user: state.Auth.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getSubscriptions: userId => dispatch(atemptGetSubscriptions(userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MySubscriptions);
