import { connect } from 'react-redux';
import LogoutButton from '../Components/Auth/LogoutButton';
import { atemptLogout } from '../Actions/Auth';

function mapStateToProps(state) {
  return {
    isLogedIn: state.Auth.isLogedIn,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    atemptLogout: data => dispatch(atemptLogout(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
