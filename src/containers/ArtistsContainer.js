import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artists from '../components/Artists';

import {
  filter,
  updateCurrentUnit,
  updateLatestUnits,
  updateSelectedArtist,
  updateShouldReset,
} from '../reducers/app';

const mapStateToProps = state => ({ app: state.app, database: state.database });

const mapDispatchToProps = {
  filter,
  updateCurrentUnit,
  updateLatestUnits,
  updateSelectedArtist,
  updateShouldReset,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Artists));