import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Profile from '../../Components/User/Profile';
import {
  atemptUpdateUser, atemptGetUser, UpdateUserAction, GetUserAction,
} from '../../Actions/User';
import { AuthState } from '../../Reducers/AuthReducer';
import { UserState } from '../../Reducers/UserReducer';
import { SetMessage } from '../../Actions/Message';
import { User } from '../../Models/User';

interface State {
  AuthReducer: AuthState;
  UserReducer: UserState;
}

interface StateProps {
  currentUserId: string | StringConstructor;
  user: User;
}

function mapStateToProps({ AuthReducer, UserReducer }: State): StateProps {
  return {
    currentUserId: AuthReducer.user._id,
    user: UserReducer.user,
  };
}

interface DispatchProps {
  updateUser: (_id: string, body: object) => void;
  getUser: (id: string) => void;
}

function mapDispatchToProps(dispatch: Dispatch<UpdateUserAction | GetUserAction | SetMessage>): DispatchProps {
  return {
    updateUser: (_id: string, body: object) => atemptUpdateUser(_id, body)(dispatch),
    getUser: (id: string) => atemptGetUser(id)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
