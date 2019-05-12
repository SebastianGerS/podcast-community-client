import { connect } from 'react-redux';
import Modals from '../../Components/Layout/Modals';
import { AuthState } from '../../Reducers/AuthReducer';
import { ModalState } from '../../Reducers/ModalReducer';


interface State {
  AuthReducer: AuthState;
  ModalReducer: ModalState;
}

interface StateProps {
  isLogedIn: boolean;
  isAdmin: boolean;
  loginModalIsActive: boolean;
  notificationsModalIsActive: boolean;
  moreOptionsModalIsActive: boolean;
  recommendToUserModalIsActive: boolean;
  rateEpisodeModalIsActive: boolean;
  followsModalIsActive: boolean;
  userModalIsActive: boolean;
}

function mapStateToProps({ AuthReducer, ModalReducer }: State): StateProps {
  return {
    isLogedIn: AuthReducer.isLogedIn,
    isAdmin: AuthReducer.isAdmin,
    loginModalIsActive: ModalReducer.loginModalIsActive,
    notificationsModalIsActive: ModalReducer.notificationsModalIsActive,
    moreOptionsModalIsActive: ModalReducer.moreOptionsModalIsActive,
    recommendToUserModalIsActive: ModalReducer.recommendToUserModalIsActive,
    rateEpisodeModalIsActive: ModalReducer.rateEpisodeModalIsActive,
    followsModalIsActive: ModalReducer.followsModalIsActive,
    userModalIsActive: ModalReducer.userModalIsActive,
  };
}


export default connect(mapStateToProps)(Modals);
