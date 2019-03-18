import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import UserRow from '../Components/Admin/UserRow';
import { selectUser, SetUser } from '../Actions/Admin';
import { ToggleUserModal } from '../Actions/Modal';
import { User } from '../Models/User';

interface DispatchProps {
  selectUser: (user: User) => void;
}

function mapDispatchToProps(dispatch: Dispatch<SetUser | ToggleUserModal>): DispatchProps {
  return {
    selectUser: (user: User) => selectUser(user)(dispatch),
  };
}

export default connect(null, mapDispatchToProps)(UserRow);
