import { ToggleSubscriptionAction } from './ToggleSubscription';
import { ToggleFollowsAction } from './ToggleFollows';

export type EventActions = ToggleSubscriptionAction | ToggleFollowsAction;

export * from './ToggleSubscription';

export * from './ToggleFollows';
