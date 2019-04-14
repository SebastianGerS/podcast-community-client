
import { connect } from 'react-redux';
import MenuInterface from '../../Components/Layout/MenuInterface';
import { ModalState } from '../../Reducers/ModalReducer';

interface State {
  ModalReducer: ModalState;
}

interface StateProps {
  menuIsActive: boolean;
}

function mapStateToProps({ ModalReducer }: State): StateProps {
  return {
    menuIsActive: ModalReducer.menuIsActive,
  };
}

export default connect(mapStateToProps)(MenuInterface);
