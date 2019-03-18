import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ListablePodcast from '../../Components/Search/ListablePodcast';
import { atemptToggleSubscription, ToggleSubscriptionAction } from '../../Actions/Event';
import { EventState } from '../../Reducers/EventReducer';
import { AuthState } from '../../Reducers/AuthReducer';
import { User } from '../../Models/User';

interface State {
  AuthReducer: AuthState;
  EventReducer: EventState;
}

interface StateProps {
  isToggelingSubscription: boolean;
  user: User;
  isLogedIn: boolean;
}

function mapStateToProps({ AuthReducer, EventReducer }: State): StateProps {
  return {
    isToggelingSubscription: EventReducer.isToggelingSubscription,
    user: AuthReducer.user,
    isLogedIn: AuthReducer.isLogedIn,
  };
}

interface DispatchProps {
  atemptToggleSubsription: (userId: string, podcastId: string) => void;
}

function mapDispatchToProps(dispatch: Dispatch<ToggleSubscriptionAction>): DispatchProps {
  return {
    atemptToggleSubsription: (
      userId: string, podcastId: string,
    ) => atemptToggleSubscription(userId, podcastId)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListablePodcast);
