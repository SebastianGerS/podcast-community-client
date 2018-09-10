import { connect } from 'react-redux';
import SearchBar from '../Components/Search/SearchBar';

function mapStateToProps(state) {
  return {
    isLogedIn: state.Auth.isLogedIn,
  };
}

export default connect(mapStateToProps)(SearchBar);
