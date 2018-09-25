import { connect } from 'react-redux';
import Category from '../Components/Subscription/Category';
import { atemptGetSubscriptions, atemptUpdateCategory } from '../Actions/User';

function mapStateToProps(state) {
  return {
    categories: state.User.categories,
    subscriptions: state.User.subscriptions,
    userId: state.Auth.user._id,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getSubscriptions: userId => dispatch(atemptGetSubscriptions(userId)),
    addToCategory: data => dispatch(atemptUpdateCategory(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
