import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SubscribeButton from '../../Components/Common/SubscribeButton';
import { attemptToggleSubscription, ToggleSubscriptionAction } from '../../Actions/Event';
import { SetMessage } from '../../Actions/Message';
import { User } from '../../Models/User';
import { AuthState } from '../../Reducers/AuthReducer';
import { EventState } from '../../Reducers/EventReducer';
import { GetSubscriptionsAction } from '../../Actions/User';
import { GetSelfSuccess } from '../../Actions/Auth';

interface State {
  AuthReducer: AuthState;
  EventReducer: EventState;
}

interface StateProps {
  isToggelingSubscription: boolean;
  user: User;
  isLogedIn: boolean;
}

function mapStateToProps({ EventReducer, AuthReducer }: State): StateProps {
  return {
    isToggelingSubscription: EventReducer.isToggelingSubscription,
    user: AuthReducer.user,
    isLogedIn: AuthReducer.isLogedIn,
  };
}

interface DispatchProps {
  attemptToggleSubsription: (userId: string, podcastId: string) => void;
}

type SubscriptionButtonActions =(
  ToggleSubscriptionAction | GetSubscriptionsAction | SetMessage | GetSelfSuccess
);

function mapDispatchToProps(dispatch: Dispatch<SubscriptionButtonActions>): DispatchProps {
  return {
    attemptToggleSubsription: (
      userId: string, podcastId: string,
    ) => attemptToggleSubscription(userId, podcastId)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeButton);
