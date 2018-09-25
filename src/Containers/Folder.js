import { connect } from 'react-redux';
import Folder from '../Components/Subscription/Folder';
import { atemptCreateCategory, atemptDeleteCategory } from '../Actions/User';

function mapStateToProps(state) {
  return {
    userId: state.Auth.user._id,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    createCategory: data => dispatch(atemptCreateCategory(data)),
    deleteCategory: (userId, categoryId) => dispatch(atemptDeleteCategory(userId, categoryId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Folder);
