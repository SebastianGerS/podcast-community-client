import { connect } from 'react-redux';
import UserRow from '../Components/Admin/UserRow';
import { selectUser } from '../Actions/Admin';


function mapDispatchToProps(dispatch) {
  return {
    selectUser: user => dispatch(selectUser(user)),
  };
}

export default connect(null, mapDispatchToProps)(UserRow);
