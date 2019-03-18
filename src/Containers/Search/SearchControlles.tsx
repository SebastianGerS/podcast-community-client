import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SearchControlles from '../../Components/Search/SearchControlles';
import { atemptSetSearchTypes, SetSearchTypeAction } from '../../Actions/Search';
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
  atemptSetType: (data: string) => void;
}

function mapDispatchToProps(dispatch: Dispatch<SetSearchTypeAction>): DispatchProps {
  return {
    atemptSetType: (data: string) => atemptSetSearchTypes(data)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchControlles);
