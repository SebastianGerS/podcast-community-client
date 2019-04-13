import { ToggleSubscriptionAction } from './ToggleSubscription';
import { CreateUserEventAction } from './CreateUserEvent';
import { GetFollowingEventsAction } from './GetFollowingEvents';
import { SetEvent } from './SetEvent';

export type EventActions = ToggleSubscriptionAction | CreateUserEventAction | GetFollowingEventsAction | SetEvent;

export * from './ToggleSubscription';
export * from './CreateUserEvent';
export * from './GetFollowingEvents';
export * from './SetEvent';
