import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ColorSheet from '../components/ColorSheet';

import {
  toggleColorSheetTab,
} from '../reducers/app';

const mapStateToProps = state => ({
  app: state.app,
  database: state.database,
  db: state.db,
  user: state.user,
});

const mapDispatchToProps = {
  toggleColorSheetTab,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ColorSheet));
