import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import UserTable from '../../Components/Admin/UserTable';
import { attemptGetUsers, UserSearch, GetUsersAction } from '../../Actions/Admin';
import { AdminState } from '../../Reducers/AdminReducer';
import { ModalState } from '../../Reducers/ModalReducer';
import { User } from '../../Models/User';
import { toggleUserModal, ToggleUserModal } from '../../Actions/Modal';
import { SetMessage } from '../../Actions/Message';

interface State {
  AdminReducer: AdminState;
  ModalReducer: ModalState;
}
interface StateProps {
  users: User[];
  isFetching: boolean;
  modalIsActive: boolean;
  morePages: boolean;
  offset: number;
}

function mapStateToProps({ AdminReducer, ModalReducer }: State): StateProps {
  return {
    users: AdminReducer.users,
    isFetching: AdminReducer.isFetching,
    modalIsActive: ModalReducer.userModalIsActive,
    morePages: AdminReducer.morePages,
    offset: AdminReducer.offset,
  };
}

interface DispatchProps {
  getUsers: (data: UserSearch) => void;
  toggleUserModal: () => void;
}

function mapDispatchToProps(dispatch: Dispatch<GetUsersAction | ToggleUserModal | SetMessage>): DispatchProps {
  return {
    getUsers: (data: UserSearch) => attemptGetUsers(data)(dispatch),
    toggleUserModal: () => dispatch(toggleUserModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
