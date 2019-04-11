import { ToggleSubscriptionAction } from './ToggleSubscription';
import { CreateUserEventAction } from './CreateUserEvent';
import { GetFollowingEventsAction } from './GetFollowingEvents';

export type EventActions = ToggleSubscriptionAction | CreateUserEventAction | GetFollowingEventsAction;

export * from './ToggleSubscription';
export * from './CreateUserEvent';
export * from './GetFollowingEvents';
