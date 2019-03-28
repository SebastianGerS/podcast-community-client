import { GetUserAction } from './GetUser';
import { UpdateUserAction } from './UpdateUser';
import { DeleteSelfAction } from './DeleteSelf';
import { GetSubscriptionsAction } from './GetSubscriptions';
import { CreateCategoryAction } from './CreateCategory';
import { UpdateCategoryAction } from './UpdateCategory';
import { DeleteCategoryAction } from './DeleteCategory';
import { GetFollowsAction } from './GetFollowers';

export type UserActions = (
  GetUserAction | UpdateUserAction | DeleteSelfAction | GetSubscriptionsAction
  | CreateCategoryAction | UpdateCategoryAction | DeleteCategoryAction | GetFollowsAction
);

export * from './GetUser';
export * from './UpdateUser';
export * from './DeleteSelf';
export * from './GetSubscriptions';
export * from './CreateCategory';
export * from './UpdateCategory';
export * from './DeleteCategory';
export * from './GetFollowers';
