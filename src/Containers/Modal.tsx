import { connect } from 'react-redux';
import ModalComponent from '../Helpers/Modal';
import { ModalState } from '../Reducers/ModalReducer';

interface State {
  ModalReducer: ModalState;
}

interface StateProps {
  height: number;
}

function mapStateToProps({ ModalReducer }: State): StateProps {
  return {
    height: ModalReducer.height,
  };
}

export default connect(mapStateToProps)(ModalComponent);
