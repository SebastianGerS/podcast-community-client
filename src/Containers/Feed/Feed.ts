import { connect } from 'react-redux';
import Feed from '../../Components/Feed/Feed';
import { Event } from '../../Models/Event';
import { EventState } from '../../Reducers/EventReducer';

interface State {
  EventReducer: EventState;
}

interface Props {
  events: Event[];
}

const mapStateToProps = ({ EventReducer }: State): Props => ({
  events: EventReducer.events,
});

export default connect(mapStateToProps)(Feed);
