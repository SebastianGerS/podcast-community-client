import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import MySubscriptions from '../../Components/Subscription/MySubscriptions';
import { attemptGetSubscriptions, GetSubscriptionsAction } from '../../Actions/User';
import { UserState } from '../../Reducers/UserReducer';
import { AuthState } from '../../Reducers/AuthReducer';
import { Category } from '../../Models/Category';
import { Podcast } from '../../Models/Podcast';
import { User } from '../../Models/User';
import { SetMessage } from '../../Actions/Message';
import { GetSelfSuccess } from '../../Actions/Auth';

interface State {
  UserReducer: UserState;
  AuthReducer: AuthState;
}

interface StateProps {
  isFetchingSubscriptions: boolean;
  subscriptions: Podcast[];
  categories: Category[];
  user: User;
}

function mapStateToProps({ UserReducer, AuthReducer }: State): StateProps {
  return {
    isFetchingSubscriptions: UserReducer.isFetchingSubscriptions,
    subscriptions: UserReducer.subscriptions,
    categories: UserReducer.categories,
    user: AuthReducer.user,
  };
}

interface DispatchProps {
  getSubscriptions: (userId: string) => void;
}

type MySubscriptionsActions = GetSubscriptionsAction | SetMessage | GetSelfSuccess;

function mapDispatchToProps(dispatch: Dispatch<MySubscriptionsActions>): DispatchProps {
  return {
    getSubscriptions: (userId: string) => attemptGetSubscriptions(userId)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MySubscriptions);
