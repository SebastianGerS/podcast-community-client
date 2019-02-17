import { connect } from 'react-redux';
import UserSettings from '../Components/Settings/UserSettings';
import { atemptUpdateUser, atemptDeleteSelf } from '../Actions/User';

function mapStateToProps(state) {
  return {
    user: state.Auth.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateUser: (_id, data) => dispatch(atemptUpdateUser(_id, data)),
    deleteUser: () => dispatch(atemptDeleteSelf()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
