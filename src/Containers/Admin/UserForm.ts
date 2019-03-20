import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import UserForm from '../../Components/Admin/UserForm';
import {
  attemptUpdateUser, unsetUser, attemptCreateUser, attemptDeleteUser, AdminActions,
} from '../../Actions/Admin';
import { toggleUserModal, ToggleUserModal } from '../../Actions/Modal';
import {
  validUsername, validEmail, validPassword, validPasswordConfirmation, validUserData, UserData,
} from '../../Actions/Auth';
import { AdminState } from '../../Reducers/AdminReducer';
import { User } from '../../Models/User';
import { SetMessage } from '../../Actions/Message';

interface State {
  AdminReducer: AdminState;
}

interface StateProps {
  user: User;
}

function mapStateToProps({ AdminReducer }: State): StateProps {
  return {
    user: AdminReducer.user,
  };
}

interface DispatchProps {
  update: (id: string, user: User) => void;
  create: (user: User) => void;
  deleteUser: (userId: string) => void;
  unsetUser: () => void;
  toggleUserModal: () => void;
  validUsername: (username: string) => void;
  validEmail: (email: string) => void;
  validPassword: (password: string) => void;
  validPasswordConfirmation: (password: string, passwordConfirmation: string) => void;
  validUserData: (user: UserData) => void;
}

type UserFormActions = AdminActions | SetMessage | ToggleUserModal;

function mapDispatchToProps(dispatch: Dispatch<UserFormActions>): DispatchProps {
  return {
    update: (id: string, user: User) => attemptUpdateUser(id, user)(dispatch),
    create: (user: User) => attemptCreateUser(user)(dispatch),
    deleteUser: (userId: string) => attemptDeleteUser(userId)(dispatch),
    unsetUser: () => dispatch(unsetUser()),
    toggleUserModal: () => dispatch(toggleUserModal()),
    validUsername: (username: string) => validUsername(username)(dispatch),
    validEmail: (email: string) => validEmail(email)(dispatch),
    validPassword: (password: string) => validPassword(password)(dispatch),
    validPasswordConfirmation: (password: string, passwordConfirmation: string) => (
      validPasswordConfirmation(password, passwordConfirmation)(dispatch)
    ),
    validUserData: (user: UserData) => validUserData(user)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
