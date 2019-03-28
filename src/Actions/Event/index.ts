import { ToggleSubscriptionAction } from './ToggleSubscription';
import { CreateUserEventAction } from './CreateUserEvent';

export type EventActions = ToggleSubscriptionAction | CreateUserEventAction;

export * from './ToggleSubscription';
export * from './CreateUserEvent';
