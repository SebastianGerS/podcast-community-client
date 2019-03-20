import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import UserSettings from '../../Components/Settings/UserSettings';
import {
  attemptUpdateUser, attemptDeleteSelf, DeleteSelfAction, UpdateUserAction, GetUserAction,
} from '../../Actions/User';
import { AuthState } from '../../Reducers/AuthReducer';
import { SetMessage } from '../../Actions/Message';
import { GetSelfSuccess, UserLogoutSuccess } from '../../Actions/Auth';
import { User } from '../../Models/User';

interface State {
  AuthReducer: AuthState;
}

interface StateProps {
  user: User;
}

function mapStateToProps({ AuthReducer }: State): StateProps {
  return {
    user: AuthReducer.user,
  };
}

type UserSettingActions = (
  DeleteSelfAction | UpdateUserAction | SetMessage | GetUserAction | GetSelfSuccess | UserLogoutSuccess
);

interface DispatchProps {
  updateUser: (_id: string, data: object) => void;
  deleteUser: () => void;
}

function mapDispatchToProps(dispatch: Dispatch<UserSettingActions>): DispatchProps {
  return {
    updateUser: (_id: string, data: object) => attemptUpdateUser(_id, data)(dispatch),
    deleteUser: () => attemptDeleteSelf()(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
