
import { CreateUserAction } from './CreateUser';
import { DeleteUserAction } from './DeleteUser';
import { GetUsersAction } from './GetUsers';
import { SetUser } from './SetUser';
import { UnsetUser } from './UnsetUser';
import { AdminUpdateUserAction } from './UpdateUser';

export type AdminActions = (
  GetUsersAction | AdminUpdateUserAction | CreateUserAction | DeleteUserAction | SetUser | UnsetUser
);

export * from './CreateUser';
export * from './DeleteUser';
export * from './GetUsers';
export * from './SetUser';
export * from './UnsetUser';
export * from './UpdateUser';
