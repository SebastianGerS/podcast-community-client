import ActionTypes from '../Actions/Podcast/types';
import Podcast from '../Models/Podcast';


const DEFAULT_STATE = {
  isFethcing: false,
  topPodcasts: [new Podcast()],


};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_TOP_PODCASTS_START:
      return { ...state, isFetching: true };
    case ActionTypes.GET_TOP_PODCASTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        topPodcasts: action.podcasts.map(podcast => new Podcast(podcast)),
      };
    case ActionTypes.GET_TOP_PODCASTS_FAILURE:
      return {
        ...state, isFetching: false,
      };
    default:
      return { ...state };
  }
}
