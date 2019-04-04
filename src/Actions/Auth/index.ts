import { UserLoginAction } from './Login';
import { UserLogoutAction } from './Logout';
import { UserRegistrationAction } from './Register';
import { GetSelfSuccess } from './GetSelf';
import { IsLogedIn } from './IsLogedin';
import { CreateSocket } from './CreateSocket';

export type AuthActions = (
  UserLoginAction | UserLogoutAction | UserRegistrationAction | GetSelfSuccess | IsLogedIn | CreateSocket
);

export * from './Login';
export * from './Logout';
export * from './Register';
export * from './GetSelf';
export * from './IsLogedin';
export * from './Validation';
export * from './CreateSocket';
