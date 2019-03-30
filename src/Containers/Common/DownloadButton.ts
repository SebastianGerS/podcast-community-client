import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import DownloadButton from '../../Components/Common/DownloadButton';
import { download, DownloadActions } from '../../Actions/Player';
import { PlayerState } from '../../Reducers/PlayerReducer';
import { Episode } from '../../Models/Episode';
import { SetMessage } from '../../Actions/Message';

interface State {
  PlayerReducer: PlayerState;
}

interface StateProps {
  isDownloading: string;
}

function mapStateToProps({ PlayerReducer }: State): StateProps {
  return {
    isDownloading: PlayerReducer.isDownloading,
  };
}

type ListableEpisodeAction = DownloadActions | SetMessage;

interface DispatchProps {
  download: (episode: Episode) => void;
}

function mapDispatchToProps(dispatch: Dispatch<ListableEpisodeAction>): DispatchProps {
  return {
    download: (episode: Episode) => download(episode)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadButton);
