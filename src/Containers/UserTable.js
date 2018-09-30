import { connect } from 'react-redux';
import UserTable from '../Components/Admin/UserTable';
import { atemptGetUsers } from '../Actions/Admin';
import { toggleUserModal } from '../Actions/Modal';


function mapStateToProps(state) {
  return {
    users: state.Admin.users,
    isFetching: state.Admin.isFetching,
    modalIsActive: state.Modal.userModalIsActive,
    morePages: state.Admin.morePages,
    offset: state.Admin.offset,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: data => dispatch(atemptGetUsers(data)),
    toggleUserModal: () => dispatch(toggleUserModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
