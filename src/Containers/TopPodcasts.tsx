import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TopPodcasts from '../Components/Podcasts/TopPodcasts';
import { atemptGetTopPodcasts, GetTopPodcastsAction } from '../Actions/Podcast';
import { PodcastState } from '../Reducers/PodcastReducer';
import { Podcast } from '../Models/Podcast';
import { SetMessage } from '../Actions/Message';

interface State {
  PodcastReducer: PodcastState;
}

interface StateProps {
  topPodcasts: Podcast[];
}

function mapStateToProps({ PodcastReducer }: State): StateProps {
  return {
    topPodcasts: PodcastReducer.topPodcasts,
  };
}

interface DispatchProps {
  getTopPodcasts: () => void;
}

function mapDispatchToProps(dispatch: Dispatch<GetTopPodcastsAction | SetMessage>): DispatchProps {
  return {
    getTopPodcasts: () => atemptGetTopPodcasts()(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopPodcasts);
