import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Folder from '../../Components/Subscription/Folder';
import {
  atemptCreateCategory,
  atemptDeleteCategory,
  CreateCategoryAction,
  DeleteCategoryAction,
  CategoryData,
  GetSubscriptionsAction,
} from '../../Actions/User';
import { AuthState } from '../../Reducers/AuthReducer';
import { SetMessage } from '../../Actions/Message';
import { GetSelfSuccess } from '../../Actions/Auth';

interface State {
  AuthReducer: AuthState;
}

interface StateProps {
  userId: string | StringConstructor;
}

function mapStateToProps({ AuthReducer }: State): StateProps {
  return {
    userId: AuthReducer.user._id,
  };
}

type FolderActions = CreateCategoryAction | DeleteCategoryAction | GetSubscriptionsAction | SetMessage | GetSelfSuccess;

interface DispatchProps {
  createCategory: (data: CategoryData) => void;
  deleteCategory: (userId: string, categoryId: string) => void;
}

function mapDispatchToProps(dispatch: Dispatch<FolderActions>): DispatchProps {
  return {
    createCategory: (data: CategoryData) => atemptCreateCategory(data)(dispatch),
    deleteCategory: (userId: string, categoryId: string) => atemptDeleteCategory(userId, categoryId)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Folder);
