import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';

import { loadLocalStorage } from '../utils';

import {
  init,
  filter,
} from '../reducers/app';

import {
  handleParser,
} from '../reducers/lyrics';

import {
  handleReset,
} from '../reducers/distribute';

const mapStateToProps = state => ({ app: state.app, database: state.database });

const mapDispatchToProps = {
  init,
  handleParser,
  handleReset,
  filter,
  loadLocalStorage,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
