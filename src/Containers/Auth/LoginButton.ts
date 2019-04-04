import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import LoginButton from '../../Components/Auth/LoginButton';
import { toggleLoginModal, ToggleLoginModal } from '../../Actions/Modal';

interface DispatchProps {
  toggleLoginModal: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<ToggleLoginModal>): DispatchProps => ({
  toggleLoginModal: () => dispatch(toggleLoginModal()),
});

export default connect(null, mapDispatchToProps)(LoginButton);
