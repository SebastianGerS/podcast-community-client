import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SearchControlles from '../../Components/Search/SearchControlles';
import { attemptSetSearchTypes, SetSearchTypeAction } from '../../Actions/Search';
import { SearchState } from '../../Reducers/SearchReducer';

interface State {
  SearchReducer: SearchState;
}

interface StateProps {
  type: string;
}

function mapStateToProps({ SearchReducer }: State): StateProps {
  return {
    type: SearchReducer.type,
  };
}

interface DispatchProps {
  attemptSetType: (data: string) => void;
}

function mapDispatchToProps(dispatch: Dispatch<SetSearchTypeAction>): DispatchProps {
  return {
    attemptSetType: (data: string) => attemptSetSearchTypes(data)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchControlles);
