import { connect } from 'react-redux';
import UserForm from '../Components/Admin/UserForm';
import {
  atemptUpdateUser, unsetUser, atemptCreateUser, atemptDeleteUser,
} from '../Actions/Admin';
import { toggleUserModal } from '../Actions/Modal';
import {
  validUsername, validEmail, validPassword, validPasswordConfirmation, validUserData,
} from '../Actions/Auth';


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
    validUsername: username => dispatch(validUsername(username)),
    validEmail: email => dispatch(validEmail(email)),
    validPassword: password => dispatch(validPassword(password)),
    validPasswordConfirmation: (password, passwordConfirmation) => dispatch(
      validPasswordConfirmation(password,
        passwordConfirmation),
    ),
    validUserData: user => dispatch(validUserData(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
