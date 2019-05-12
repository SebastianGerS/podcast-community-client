import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ModalComponent from '../../Components/Common/Modal';
import { ModalState } from '../../Reducers/ModalReducer';
import { HeightUpdated, heightUpdated } from '../../Actions/Modal';

interface State {
  ModalReducer: ModalState;
}

interface StateProps {
  height: number;
  hasResized: boolean;
}

function mapStateToProps({ ModalReducer }: State): StateProps {
  return {
    height: ModalReducer.height,
    hasResized: ModalReducer.hasResized,
  };
}

interface DipsatchProps {
  heightUpdated: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<HeightUpdated>): DipsatchProps => ({
  heightUpdated: () => dispatch(heightUpdated()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
