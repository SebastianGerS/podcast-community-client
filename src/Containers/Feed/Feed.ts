import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Feed from '../../Components/Feed/Feed';
import { Event } from '../../Models/Event';
import { EventState } from '../../Reducers/EventReducer';
import {
  attemptGetFollowingEvents, GetFollowingEventsAction, SetEvent, setEvent,
} from '../../Actions/Event';
import { SetMessage } from '../../Actions/Message';
import { AuthState } from '../../Reducers/AuthReducer';

interface State {
  EventReducer: EventState;
  AuthReducer: AuthState;
}

interface Props {
  events: Event[];
  socket: any;
  userId: string | StringConstructor;
  nextOffset: number;
  morePages: boolean;
  isFetching: boolean;
}

const mapStateToProps = ({ EventReducer, AuthReducer }: State): Props => ({
  events: EventReducer.events,
  socket: AuthReducer.socket,
  userId: AuthReducer.user._id,
  nextOffset: EventReducer.nextOffset,
  morePages: EventReducer.morePages,
  isFetching: EventReducer.isFetchingEvents,
});

type FeedActions = GetFollowingEventsAction | SetMessage | SetEvent;

interface DispatchProps {
  getFollowingEvents: (offset: number) => void;
  setEvent: (event: Event) => void;
}

function mapDispatchToProps(dispatch: Dispatch<FeedActions>): DispatchProps {
  return {
    getFollowingEvents: (offset: number) => attemptGetFollowingEvents(offset)(dispatch),
    setEvent: (event: Event) => dispatch(setEvent(event)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
