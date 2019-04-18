import { GetUserAction } from './GetUser';
import { UpdateUserAction } from './UpdateUser';
import { DeleteSelfAction } from './DeleteSelf';
import { GetSubscriptionsAction } from './GetSubscriptions';
import { CreateCategoryAction } from './CreateCategory';
import { UpdateCategoryAction } from './UpdateCategory';
import { DeleteCategoryAction } from './DeleteCategory';
import { GetFollowsAction } from './GetFollowers';
import { UpdateOnlineStatuses } from './UpdateOnlineStatuses';
import { SetOnlineStatuses } from './SetOnlineStatuses';

export type UserActions = (
  GetUserAction | UpdateUserAction | DeleteSelfAction | GetSubscriptionsAction | UpdateOnlineStatuses
  | CreateCategoryAction | UpdateCategoryAction | DeleteCategoryAction | GetFollowsAction | SetOnlineStatuses
);

export * from './GetUser';
export * from './UpdateUser';
export * from './DeleteSelf';
export * from './GetSubscriptions';
export * from './CreateCategory';
export * from './UpdateCategory';
export * from './DeleteCategory';
export * from './GetFollowers';
export * from './UpdateOnlineStatuses';
export * from './SetOnlineStatuses';
