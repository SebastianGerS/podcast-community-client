import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import MoreOptionsButton from '../../../Components/Common/MoreOptions/MoreOptionsButton';
import { setAndToggleMoreOptionsModal, SetAndToggleActions } from '../../../Actions/Modal/index';
import { Podcast } from '../../../Models/Podcast';
import { Episode } from '../../../Models/Episode';

interface DispatchProps {
  setAndToggleMoreOptionsModal: (item: Podcast| Episode) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<SetAndToggleActions>): DispatchProps => ({
  setAndToggleMoreOptionsModal: (item: Podcast| Episode) => setAndToggleMoreOptionsModal(item)(dispatch),
});

export default connect(null, mapDispatchToProps)(MoreOptionsButton);
