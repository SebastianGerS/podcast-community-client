import { connect } from 'react-redux';
import Modal from '../Helpers/Modal';

function mapStateToProps(state) {
  return {
    height: state.Modal.height,
  };
}

export default connect(mapStateToProps)(Modal);
