import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Romanizer from '../components/Romanizer';

import {
  updateRomanizationResults,
  updateRomanizationType,
} from '../reducers/admin';

const mapStateToProps = state => ({
  admin: state.admin,
  app: state.app,
  auth: state.auth,
  database: state.database,
  db: state.db,
});

const mapDispatchToProps = {
  updateRomanizationResults,
  updateRomanizationType,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Romanizer)
);