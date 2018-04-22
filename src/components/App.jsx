import React, { Component } from 'react';

import Header from './Header';

class App extends Component {
  componentWillMount() {
    this.props.initDB();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.db.loaded !== this.props.db.loaded) {
      this.props.checkAuth();
    }

    // If going to Distribute, reset distribute when unit is different
    if (nextProps.location.pathname === '/distribute' && nextProps.app.currentUnit !== this.props.app.currentUnit) {
      this.props.handleReset();
    }
  }

  render() {
    return (<Header props={this.props} />);
  }
}

export default App;
