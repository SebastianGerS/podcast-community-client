import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import MoreOptionsButton from '../../../Components/Common/MoreOptions/MoreOptionsButton';
import { toggleMoreOptionsModal, ToggleMoreOptionsModal } from '../../../Actions/Modal/index';

interface DispatchProps {
  toggleMoreOptionsModal: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<ToggleMoreOptionsModal>): DispatchProps => ({
  toggleMoreOptionsModal: () => dispatch(toggleMoreOptionsModal()),
});

export default connect(null, mapDispatchToProps)(MoreOptionsButton);
