import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ListableUser from '../../Components/Search/ListableUser';
import { AuthState } from '../../Reducers/AuthReducer';
import { User } from '../../Models/User';
import { UpdateUserSearchResults, updateUserSearchResults } from '../../Actions/Search';

interface State {
  AuthReducer: AuthState;
}

interface StateProps {
  socket: any;
}

function mapStateToProps({ AuthReducer }: State): StateProps {
  return {
    socket: AuthReducer.socket,
  };
}

interface DispatchProps {
  updateUserSearchResults: (user: User) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<UpdateUserSearchResults>): DispatchProps => ({
  updateUserSearchResults: (user: User) => dispatch(updateUserSearchResults(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListableUser);
