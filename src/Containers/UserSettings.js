import { connect } from 'react-redux';
import UserSettings from '../Components/Settings/UserSettings';
import { atemptUpdateUser } from '../Actions/User';
import { atemptSetMessage } from '../Actions/Message';

function mapStateToProps(state) {
  return {
    user: state.Auth.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateUser: (_id, body) => dispatch(atemptUpdateUser(_id, body)),
    atemptSetMessage: message => dispatch(atemptSetMessage(message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
