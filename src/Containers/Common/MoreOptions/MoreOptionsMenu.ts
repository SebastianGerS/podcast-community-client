import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import MoreOptionsMenu from '../../../Components/Common/MoreOptions/MoreOptionsMenu';
import {
  setAndToggleMoreOptionsModal, SetAndToggleActions, toggleRecommendToUserModal, ToggleRecommendToUserModal,
} from '../../../Actions/Modal/index';
import { MoreOptionsState } from '../../../Reducers/MoreOptionsReducer';
import { Episode } from '../../../Models/Episode';
import { Podcast } from '../../../Models/Podcast';

interface State {
  MoreOptionsReducer: MoreOptionsState;
}

interface Props {
  episode?: Episode;
  podcast?: Podcast;
}

const mapStateToProps = ({ MoreOptionsReducer }: State): Props => ({
  episode: MoreOptionsReducer.episode,
  podcast: MoreOptionsReducer.podcast,
});

interface DispatchProps {
  setAndToggleMoreOptionsModal: () => void;
  toggleRecommendToUserModal: () => void;
}

type MoreOptionsMenuActions = SetAndToggleActions | ToggleRecommendToUserModal;

const mapDispatchToProps = (dispatch: Dispatch<MoreOptionsMenuActions>): DispatchProps => ({
  setAndToggleMoreOptionsModal: () => setAndToggleMoreOptionsModal()(dispatch),
  toggleRecommendToUserModal: () => dispatch(toggleRecommendToUserModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreOptionsMenu);
