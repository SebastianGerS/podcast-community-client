import { connect } from 'react-redux';
import Profile from '../Components/User/Profile';
import { atemptUpdateUser, atemptGetUser } from '../Actions/User';

function mapStateToProps(state) {
  return {
    currentUserId: state.Auth.user._id,
    user: state.User.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateUser: data => dispatch(atemptUpdateUser(data)),
    getUser: id => dispatch(atemptGetUser(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
