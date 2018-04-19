import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Songs from '../components/Songs';

import {
	loadSong,
	loadSongs,
} from '../reducers/songs';

const mapStateToProps = state => ({
  app: state.app,
  songs: state.songs,
});

const mapDispatchToProps = {
	loadSong,
	loadSongs,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Songs));
