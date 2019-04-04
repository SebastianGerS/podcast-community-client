import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RemoveFollowerButton from '../../Components/Follows/RemoveFollowerButton';
import { CreateUserEventActions, attemptRemoveFollower } from '../../Actions/Event';

interface DispatchState {
  remove: (targetUserId: string) => void;
}
type RemoveFollowerButtonActions = CreateUserEventActions;

const mapDispatchToProps = (dispatch: Dispatch<RemoveFollowerButtonActions>): DispatchState => ({
  remove: (targetUserId: string) => attemptRemoveFollower(targetUserId)(dispatch),
});

export default connect(null, mapDispatchToProps)(RemoveFollowerButton);
