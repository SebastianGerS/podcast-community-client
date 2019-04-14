import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Feed from '../../Components/Feed/Feed';
import { Event } from '../../Models/Event';
import { EventState } from '../../Reducers/EventReducer';
import { attemptGetFollowingEvents, GetFollowingEventsAction } from '../../Actions/Event';
import { SetMessage } from '../../Actions/Message';

interface State {
  EventReducer: EventState;
}

interface Props {
  events: Event[];
  nextOffset: number;
  morePages: boolean;
  isFetching: boolean;
}

const mapStateToProps = ({ EventReducer }: State): Props => ({
  events: EventReducer.events,
  nextOffset: EventReducer.nextOffset,
  morePages: EventReducer.morePages,
  isFetching: EventReducer.isFetchingEvents,
});

type FeedActions = GetFollowingEventsAction | SetMessage;

interface DispatchProps {
  getFollowingEvents: (offset: number) => void;
}

function mapDispatchToProps(dispatch: Dispatch<FeedActions>): DispatchProps {
  return {
    getFollowingEvents: (offset: number) => attemptGetFollowingEvents(offset)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
