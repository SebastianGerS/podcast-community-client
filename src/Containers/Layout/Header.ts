import { connect } from 'react-redux';
import Header from '../../Components/Layout/Header';
import { AuthState } from '../../Reducers/AuthReducer';

interface State {
  AuthReducer: AuthState;
}

interface StateProps {
  isLogedIn: boolean;
}

function mapStateToProps({ AuthReducer }: State): StateProps {
  return {
    isLogedIn: AuthReducer.isLogedIn,
  };
}

export default connect(mapStateToProps)(Header);
