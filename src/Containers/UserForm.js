import { connect } from 'react-redux';
import UserForm from '../Components/Admin/UserForm';
import {
  atemptUpdateUser, unsetUser, atemptCreateUser, atemptDeleteUser,
} from '../Actions/Admin';
import { toggleUserModal } from '../Actions/Modal';
import { atemptSetMessage } from '../Actions/Message';


function mapStateToProps(state) {
  return {
    user: state.Admin.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    update: (id, user) => dispatch(atemptUpdateUser(id, user)),
    create: user => dispatch(atemptCreateUser(user)),
    deleteUser: userId => dispatch(atemptDeleteUser(userId)),
    unsetUser: () => dispatch(unsetUser()),
    toggleUserModal: () => dispatch(toggleUserModal()),
    setMessage: message => dispatch(atemptSetMessage(message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
