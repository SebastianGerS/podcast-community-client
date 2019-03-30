import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RequestConfirmation from '../../Components/Follows/RequestConfirmation';
import { CreateUserEventActions, attemptConfirmFollowRequest, attemptRejectFollowRequest } from '../../Actions/Event';

interface DispatchState {
  confirm: (targetUserId: string) => void;
  reject: (targetUserId: string) => void;
}
type RequestConfirmationActions = CreateUserEventActions;

const mapDispatchToProps = (dispatch: Dispatch<RequestConfirmationActions>): DispatchState => ({
  confirm: (targetUserId: string) => attemptConfirmFollowRequest(targetUserId)(dispatch),
  reject: (targetUserId: string) => attemptRejectFollowRequest(targetUserId)(dispatch),
});

export default connect(null, mapDispatchToProps)(RequestConfirmation);
