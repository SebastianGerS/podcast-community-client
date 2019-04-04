import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import MoreOptionsMenu from '../../../Components/Common/MoreOptions/MoreOptionsMenu';
import { toggleMoreOptionsModal, ToggleMoreOptionsModal } from '../../../Actions/Modal/index';

interface DispatchProps {
  toggleMoreOptionsModal: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<ToggleMoreOptionsModal>): DispatchProps => ({
  toggleMoreOptionsModal: () => dispatch(toggleMoreOptionsModal()),
});

export default connect(null, mapDispatchToProps)(MoreOptionsMenu);
