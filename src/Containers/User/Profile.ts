import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Profile from '../../Components/User/Profile';
import {
  attemptUpdateUser, attemptGetUser, UpdateUserAction, GetUserAction, gotUser, GetUserSuccess,
} from '../../Actions/User';
import { AuthState } from '../../Reducers/AuthReducer';
import { UserState } from '../../Reducers/UserReducer';
import { SetMessage } from '../../Actions/Message';
import { User } from '../../Models/User';
import { GetSelfSuccess } from '../../Actions/Auth';

interface State {
  AuthReducer: AuthState;
  UserReducer: UserState;
}

interface StateProps {
  currentUserId: string | StringConstructor;
  user: User;
  isAdmin: boolean;
  socket: any;
}

function mapStateToProps({ AuthReducer, UserReducer }: State): StateProps {
  return {
    currentUserId: AuthReducer.user._id,
    user: UserReducer.user,
    isAdmin: AuthReducer.isAdmin,
    socket: AuthReducer.socket,
  };
}

interface DispatchProps {
  updateUser: (_id: string, body: object) => void;
  getUser: (id: string) => void;
  setUpdatedUser: (user: User) => void;
}

type ProfileActions = UpdateUserAction | GetUserAction | SetMessage | GetSelfSuccess | GetUserSuccess;

function mapDispatchToProps(dispatch: Dispatch<ProfileActions>): DispatchProps {
  return {
    updateUser: (_id: string, body: object) => attemptUpdateUser(_id, body)(dispatch),
    getUser: (id: string) => attemptGetUser(id)(dispatch),
    setUpdatedUser: (user: User) => dispatch(gotUser(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
