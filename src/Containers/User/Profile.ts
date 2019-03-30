import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Profile from '../../Components/User/Profile';
import {
  attemptUpdateUser, attemptGetUser, UpdateUserAction, GetUserAction,
} from '../../Actions/User';
import { AuthState } from '../../Reducers/AuthReducer';
import { UserState } from '../../Reducers/UserReducer';
import { SetMessage } from '../../Actions/Message';
import { User } from '../../Models/User';
import { EventState } from '../../Reducers/EventReducer';
import { GetSelfSuccess } from '../../Actions/Auth';

interface State {
  AuthReducer: AuthState;
  UserReducer: UserState;
  EventReducer: EventState;
}

interface StateProps {
  currentUserId: string | StringConstructor;
  user: User;
  isAdmin: boolean;
  isCreatingUserEvent: boolean;
}

function mapStateToProps({ AuthReducer, UserReducer, EventReducer }: State): StateProps {
  return {
    currentUserId: AuthReducer.user._id,
    user: UserReducer.user,
    isAdmin: AuthReducer.isAdmin,
    isCreatingUserEvent: EventReducer.isCreatingUserEvent,
  };
}

interface DispatchProps {
  updateUser: (_id: string, body: object) => void;
  getUser: (id: string) => void;
}

type ProfileActions = UpdateUserAction | GetUserAction | SetMessage | GetSelfSuccess;

function mapDispatchToProps(dispatch: Dispatch<ProfileActions>): DispatchProps {
  return {
    updateUser: (_id: string, body: object) => attemptUpdateUser(_id, body)(dispatch),
    getUser: (id: string) => attemptGetUser(id)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
