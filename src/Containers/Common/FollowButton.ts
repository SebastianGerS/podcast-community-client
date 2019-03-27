import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import FollowButton from '../../Components/Common/FollowButton';
import { attemptToggleFollows, ToggleFollowsAction } from '../../Actions/Event';
import { SetMessage } from '../../Actions/Message';
import { User } from '../../Models/User';
import { AuthState } from '../../Reducers/AuthReducer';
import { EventState } from '../../Reducers/EventReducer';
import { GetSelfSuccess } from '../../Actions/Auth';

interface State {
  AuthReducer: AuthState;
  EventReducer: EventState;
}

interface StateProps {
  isToggelingFollows: boolean;
  currentUser: User;
  isLogedIn: boolean;
}

function mapStateToProps({ EventReducer, AuthReducer }: State): StateProps {
  return {
    isToggelingFollows: EventReducer.isToggelingFollows,
    currentUser: AuthReducer.user,
    isLogedIn: AuthReducer.isLogedIn,
  };
}

interface DispatchProps {
  toggleFollows: (userId: string, targetUserId: string) => void;
}

type FollowsButtonActions =(
  ToggleFollowsAction | SetMessage | GetSelfSuccess
);

function mapDispatchToProps(dispatch: Dispatch<FollowsButtonActions>): DispatchProps {
  return {
    toggleFollows: (
      userId: string, targetUserId: string,
    ) => attemptToggleFollows(userId, targetUserId)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
