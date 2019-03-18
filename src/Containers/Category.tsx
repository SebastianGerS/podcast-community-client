import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import CategoryComponent from '../Components/Subscription/Category';
import {
  atemptGetSubscriptions, atemptUpdateCategory, GetSubscriptionsAction, UpdateCategoryAction, UpdateCategory,
} from '../Actions/User';
import { UserState } from '../Reducers/UserReducer';
import { AuthState } from '../Reducers/AuthReducer';
import { SetMessage } from '../Actions/Message';
import { GetSelfSuccess } from '../Actions/Auth';
import { Category } from '../Models/Category';
import { Podcast } from '../Models/Podcast';

interface State {
  UserReducer: UserState;
  AuthReducer: AuthState;
}

interface StateProps {
  categories: Category[];
  subscriptions: Podcast[];
  userId: string | StringConstructor;
}

function mapStateToProps({ UserReducer, AuthReducer }: State): StateProps {
  return {
    categories: UserReducer.categories,
    subscriptions: UserReducer.subscriptions,
    userId: AuthReducer.user._id,
  };
}

type CategoryActions = GetSubscriptionsAction | UpdateCategoryAction | SetMessage | GetSelfSuccess;

interface DispatchProps {
  getSubscriptions: (userId: string) => void;
  addToCategory: (data: UpdateCategory) => void;
}

function mapDispatchToProps(dispatch: Dispatch<CategoryActions>): DispatchProps {
  return {
    getSubscriptions: (userId: string) => atemptGetSubscriptions(userId)(dispatch),
    addToCategory: (data: UpdateCategory) => atemptUpdateCategory(data)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);
